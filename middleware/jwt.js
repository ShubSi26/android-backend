const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.use((req, res, next) => {
    const token = req.headers['authorization'];
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).json({ message: 'Invalid token' });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.status(401).json({ message: 'Token not provided' });
    }
});

module.exports = router;