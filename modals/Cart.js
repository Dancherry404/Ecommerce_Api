const mongoose = require("mongoose")

const CartSchema = new mongoose.Schema({

    products: [
        {
            product : {
              type : mongoose.Schema.Types.ObjectId,
              ref : "Product"
            }, 
            quantity : {
              type : Number,
              required : true,
              min : 1
            }
        }
    ]

})

const Cart = mongoose.model("Cart", CartSchema)
module.exports = Cart