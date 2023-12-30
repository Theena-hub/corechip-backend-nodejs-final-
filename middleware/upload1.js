const multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/banner');
    },
    filename: (req, file, cb) => {
        const fileExtension = file.originalname.split('.').pop();
        let ext = `${req.body.bannerName.replace(/\s/g, '_')}_${Date.now()}.${fileExtension}`;
        cb(null,ext);
    }
})

var upload = multer({
    storage : storage,
    limits : { fileSize: 3 * 1024 * 1024 },
    fileFilter: (req, file, callback) => {
        if (file.mimetype == "image/png"|| file.mimetype== 'image/webp' || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"|| file.mimetype == "application/octet-stream" ){
            callback(null, true);
        } else {
            console.log("only jpg & png file suppoted!");
            callback(null, false);
        }
    }
})
module.exports = upload;