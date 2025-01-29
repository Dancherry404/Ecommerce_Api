const express = require('express')
const {getAllProducts, createProduct, updateProduct, deleteProduct} = require("../contollers/ProductController")

const router = express.Router()

router.get('/get-product', getAllProducts)
router.post('/add-product',createProduct)
router.put('/update-produt/:id',updateProduct)
router.delete('/delete-product/:id',deleteProduct)

module.exports = router;