const exprerss = require('express');
const {payment} = require('../db');
const jwtmiddleware = require('../middleware/jwt');

const router = exprerss.Router();

router.get('/', jwtmiddleware, async (req, res) => {
    const userid = req.decoded.id;

    try {
        const payments = await payment.find({ customerid: userid }).sort({ date: -1 });
        if (!payments) {
            return res.status(404).json({ message: 'No payments found' });
        }
        res.json(payments);
    } catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong");
    }
});

module.exports = router;