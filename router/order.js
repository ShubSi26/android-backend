const exprerss = require('express');
const razorpay = require('../razorpay');
const jwtmiddleware = require('../middleware/jwt');
const {user,consignment,payment} = require('../db');

const router = exprerss.Router();

router.post('/createorder',jwtmiddleware,async (req, res) => {

    const {quantity,price} = req.body;
    const userid = req.decoded.id;
    const txid = "F2F" + Math.floor(Math.random() * 1000000);
    const key_id = process.env.RZP_KEYID;

    try {
        const options = {
          amount: Number(price)*100,
          currency: "INR",
          receipt: txid,
          notes: {
            quantity: quantity,
            }
        };
    
        const order = await razorpay.orders.create(options);
        const dbresonse = await payment.create({id:txid,amount:price, status:"Pending",customerid:userid});
        if(!dbresonse){
            return res.status(400).json({message:'Order creation failed'});
        }
        res.json({...order,key:key_id,order_id: order.id,}); 
      } catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong");
      }
})  

module.exports = router;