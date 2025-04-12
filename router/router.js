const exprerss = require('express');

const router = exprerss.Router();
router.use(exprerss.json());
router.use('/login', require('./login'));
router.use('/register', require('./register'));
router.use('/tokenverify', require('./tokenverify'));
router.use('/userdetail', require('./userdetail'));
router.use('/order',require('./order'))
router.use('/getpayment',require('./getpayment'));
router.use('/getconsignment',require('./getconsignment'));
router.use('/getcreatedconsignment',require('./getcreatedconsignment'));

module.exports = router;