const exprerss = require('express');
const jwtmiddleware = require('../middleware/jwt');
const {user} = require('../db');

const router = exprerss.Router();

router.get('/',jwtmiddleware,async (req, res) => {
    const id = req.decoded.id;
    const response = await user.findOne({_id:id},{password:0});

    if(!response){
        return res.status(400).json({message:'User not found'});
    }

    return res.status(200).json({data:response});

})

module.exports = router;