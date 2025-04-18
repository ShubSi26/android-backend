const exprerss = require('express');
const {consignment} = require('../db');
const jwtmiddleware = require('../middleware/jwt');

const router = exprerss.Router();

router.get('/',jwtmiddleware,async (req,res)=>{
    const userid = req.decoded.id;
    const role = req.decoded.role;

    if(role !== 'Customer' && role !== 'Farmer') {
        return res.status(403).json({ message: 'Forbidden' });
    }

    if(role === 'Customer'){
        try {
            const consignments = await consignment.find({ customerid: userid }).sort({ date: -1 });
            if (!consignments) {
                return res.status(404).json({ message: 'No consignments found' });
            }
            res.json(consignments);
        } catch (err) {
            console.error(err);
            res.status(500).send("Something went wrong");
        }
    }

    if(role === 'Farmer'){
        try {
            const consignments = await consignment.find({ farmerid: userid }).sort({ date: -1 });
            if (!consignments) {
                return res.status(404).json({ message: 'No consignments found' });
            }
            res.json(consignments);
        } catch (err) {
            console.error(err);
            res.status(500).send("Something went wrong");
        } 
    }
})

module.exports = router;