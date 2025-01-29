const express = require('express')

const {addCart,getCart, updateCart, deleteCart, clearCart} = require('../contollers/CartController')


const router = express.Router()

router.post('/add-cart',addCart)
router.get('/get-cart',getCart)
router.put('/update-cart/:id',updateCart)
router.delete('/delete-cart/:id',deleteCart)
router.delete('/clear-cart',clearCart)

module.exports = router;