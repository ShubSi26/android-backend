const exprerss = require('express');
const {payment} = require('../db');
const jwtmiddleware = require('../middleware/jwt');

const router = exprerss.Router();

router.get('/', jwtmiddleware, async (req, res) => {
    const userid = req.decoded.id;
    const role = req.decoded.role;

    if (role === 'Customer') {
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
    } else if (role === 'Farmer') {
        try {
            const payments = await payment.find({ farmerid: userid }).sort({ date: -1 });
            if (!payments) {
                return res.status(404).json({ message: 'No payments found' });
            }
            res.json(payments);
        } catch (err) {
            console.error(err);
            res.status(500).send("Something went wrong");
        }
    } else {
        return res.status(403).json({ message: 'Forbidden' });
    }
});

module.exports = router;