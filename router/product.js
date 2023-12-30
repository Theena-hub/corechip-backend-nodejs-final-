const express= require('express')
const routes=express.Router()
const products=require('../controller/product')

routes.post("/add_product",products.addProduct)
routes.post("/get_product",products.getProduct)
routes.post("/get_productbyId",products.getProductbyId)
routes.post("/delete_ProductbyId",products.deleteProductbyId)
// routes.post("/addToCard",products.addToCard)


module.exports = routes;  