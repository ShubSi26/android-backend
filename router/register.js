const exprerss = require('express');
const {user} = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = exprerss.Router();

router.post('/',async (req, res) => {
    const { email, password,name,role } = req.body;
    console.log(req.body)
    if (!email || !password || !name || !role) {
        return res.status(400).json({ message: 'Please enter all fields' });
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    const response = await user.create({name:name,email:email,password:hashedpassword,role:role});

    if(!response){
        return res.status(400).json({message:'User already exists'});
    }

    return res.status(200).json({message:'User created successfully'});
});

module.exports = router;