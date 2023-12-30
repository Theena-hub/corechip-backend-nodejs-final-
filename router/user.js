const express= require('express')
const routes=express.Router()
const User=require('../controller/user')

routes.post("/admin_login",User.adminLogin)
routes.post("/user_login",User.userLogin)
routes.post("/register",User.register)
routes.post("/contactUs",User.contactUs)
routes.post("/getContactUs",User.getContactUsDetails)
routes.post("/getUser",User.getUser)

module.exports = routes;  