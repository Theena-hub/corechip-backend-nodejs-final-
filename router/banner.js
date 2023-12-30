const router = require('express').Router();
const banner = require('../controller/banner');

router.post("/add_banner",banner.addBanner);
router.post("/get_banner",banner.getBanner);
router.post("/delete_banner",banner.deleteBanner);

module.exports = router;