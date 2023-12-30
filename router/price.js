const router = require('express').Router();
const price = require('../controller/price');

router.post("/add_price",price.addPrice);
router.post("/get_price_list",price.getPrice);
router.post("/delete_price",price.deletePrice);
router.post("/getPrice_byid",price.getPriceById);

module.exports = router;