const Razorpay = require("razorpay");
const dotenv = require("dotenv");
dotenv.config();

const razorpay = new Razorpay({
    key_id: process.env.RZP_KEYID,
    key_secret: process.env.RZP_SECRET,
});

console.log("Razorpay initialized");

module.exports = razorpay; 