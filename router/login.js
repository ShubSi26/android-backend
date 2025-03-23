const exprerss = require('express');
const {user} = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = exprerss.Router();

router.post('/',async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)
    if (!email || !password) {
        return res.status(400).json({ message: 'Please enter all fields' });
    }

    const response = await user.findOne({ email },{password:1}); 
    if (!response) {
        return res.status(400).json({ message: 'User does not exist' });
    }

    const isMatch = await bcrypt.compare(password, response.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: response._id }, process.env.JWT_SECRET);

    return res.status(200).json({ token });

});

module.exports = router;