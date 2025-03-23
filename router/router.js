const exprerss = require('express');

const router = exprerss.Router();
router.use(exprerss.json());
router.use('/login', require('./login'));
router.use('/register', require('./register'));
router.use('/tokenverify', require('./tokenverify'));

module.exports = router;