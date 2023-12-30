const path = require('path')
const multer = require('multer')

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/product')
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        let ext = `${req.body.productName}-${fileName}`
        cb(null,ext)
    }
})

var upload = multer({
    storage,
    fileFilter: (req, file, callback) => {
        if (file.mimetype == "image/png"|| file.mimetype== 'image/webp' || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"|| file.mimetype == "application/octet-stream" ){
            console.log(file)
            callback(null, true)
        } else {
            console.log("only jpg & png file suppoted!")
            console.log(file)
            callback(null, false)
        }
    }
})
module.exports = upload