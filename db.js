const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI);

const userschema = new mongoose.Schema({
        name:{type:String, required:true,trim:true},
        email:{type:String, required:true,trim:true,unique:true},
        password:{type:String, required:true},
        role:{type:String, enum:['Customer','Farmer','Manufacturer'],default:'Customer'},
})

const consignmentschema = new mongoose.Schema({
    id:{type:String,required:true},
    date:{type:Date,required:true,default:() => Date.now()},
    status:{type:String,enum:['Created','Manufacturer','Farmer','Manufacturer2','Completed'],default:'Created'},
    paymentid:{type:String,required:true},
    farmerid:{type:String,required:true},
    manufacturerid:{type:String,required:true},
    customerid:{type:String,required:true},
})

const paymentschema = new mongoose.Schema({
    id:{type:String,required:true},
    date:{type:Date,required:true,default:() => Date.now()},
    amount:{type:Number,required:true},
    status:{type:String,enum:['Pending','Completed'],default:'Pending'},
    customerid:{type:String,required:true},
})

const user = mongoose.model('user',userschema);
const consignment = mongoose.model('consignment',consignmentschema);
const payment = mongoose.model('payment',paymentschema);

module.exports = {user,consignment,payment};