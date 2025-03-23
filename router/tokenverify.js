const express = require('express');
const jwtmiddleware = require('../middleware/jwt');
const router = express.Router();

router.get('/', jwtmiddleware, (req, res) => {
    res.status(200).json({ message: 'Token verified' });
});

module.exports = router;