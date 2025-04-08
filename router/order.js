const exprerss = require('express');
const crypto = require("crypto");
const razorpay = require('../razorpay');
const jwtmiddleware = require('../middleware/jwt');
const {user,consignment,payment} = require('../db');

const router = exprerss.Router();

router.post('/createorder',jwtmiddleware,async (req, res) => {

    const {quantity,price} = req.body;
    const userid = req.decoded.id;
    const key_id = process.env.RZP_KEYID;

    try {
        const options = {
          amount: Number(price)*100,
          currency: "INR",
          notes: {
            quantity: quantity,
            }
        };
    
        const order = await razorpay.orders.create(options);
        const dbresonse = await payment.create({order_id: order.id,amount:price, status:"Pending",customerid:userid, quantity:quantity});
        if(!dbresonse || !order){
            return res.status(400).json({message:'Order creation failed'});
        }
        res.json({...order,key:key_id,order_id: order.id}); 
      } catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong");
      }
})  


router.post('/verify',jwtmiddleware,async (req, res) => {
    const {razorpay_order_id,razorpay_payment_id,razorpay_signature} = req.body;
    const userid = req.decoded.id;
    const txid = "F2F" + Math.floor(Math.random() * 1000000);

    const generated_signature = crypto.createHmac('sha256', process.env.RZP_SECRET)
        .update(razorpay_order_id + "|" + razorpay_payment_id)
        .digest('hex');

    if(generated_signature === razorpay_signature){
        const paymentResponse = await payment.findOneAndUpdate(
            { order_id: razorpay_order_id },
            { 
              $set: {
                paymentid: razorpay_payment_id,
                paymentstatus: "Completed",
                consignment_id: txid
              }
            },
            {
              new: true,                        // Return the updated document
              projection: { quantity: 1, amount: 1 }  // Return only these fields
            }
          );
        console.log(paymentResponse);
        const consignmentresponse = await consignment.create(
            {
                consignment_id:txid,
                status:'step0',
                paymentid:razorpay_payment_id,
                paymentstatus:"Completed",
                customerid:userid,
                quantity:paymentResponse.quantity,
                price:paymentResponse.amount,
            }
        );
        res.status(200).json({message:"Created successfully"})
    }else{
        res.status(400).json({message:"Invalid signature"})
    }
})

module.exports = router;