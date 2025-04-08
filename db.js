const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI);

const userschema = new mongoose.Schema({
    name:{type:String, required:true,trim:true},
    email:{type:String, required:true,trim:true,unique:true},
    password:{type:String, required:true},
    role:{type:String, enum:['Customer','Farmer','Manufacturer'],default:'Customer'},
    phone: { type: String },
    address: { type: String },
    occupation: { type: String },
},{ timestamps: true })

const consignmentschema = new mongoose.Schema({
    consignment_id:{type:String,required:true},
    date:{type:Date,required:true,default:() => Date.now()},
    status:{type:String,enum:['step0','step1','step2'],default:'step0'},
    paymentid:{type:String,default:""},
    paymentstatus:{type:String,enum:['Pending','Completed'],default:'Pending'},
    farmerid:{type:String},
    customerid:{type:String,required:true},
    quantity:{type:Number,required:true},
    price:{type:Number,required:true},
    trackingid:{type:String,default:""},
})

const paymentschema = new mongoose.Schema({
    consignment_id:{type:String},
    date:{type:Date,required:true,default:() => Date.now()},
    amount:{type:Number,required:true},
    status:{type:String,enum:['Pending','Completed'],default:'Pending'},
    customerid:{type:String,required:true},
    farmerid:{type:String},
    quantity:{type:Number,required:true},
    order_id:{type:String,required:true,unique:true},
    paymentid:{type:String,default:""},
})

const user = mongoose.model('user',userschema);
const consignment = mongoose.model('consignment',consignmentschema);
const payment = mongoose.model('payment',paymentschema);

module.exports = {user,consignment,payment};