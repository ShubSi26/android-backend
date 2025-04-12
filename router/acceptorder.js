const exprerss = require('express');
const {consignment} = require('../db');
const jwtmiddleware = require('../middleware/jwt');

const router = exprerss.Router();

router.post('/',jwtmiddleware,async (req,res)=>{
    const userid = req.decoded.id;
    const role = req.decoded.role;

    if(role !== 'Farmer') {
        return res.status(403).json({ message: 'Forbidden' });
    }

    const {consignmentid} = req.body;

    try {
        const updatedConsignment = await consignment.findOneAndUpdate(
            { consignment_id: consignmentid },
            { status: 'step1', farmerid: userid },
        );

        if (!updatedConsignment) {
            return res.status(404).json({ message: 'Consignment not found' });
        }

        res.json({ message: 'Consignment accepted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong");
    }
})

module.exports = router;