const Cart = require('../modals/Cart')

exports.addCart = async (req, res) => {

    const { productId, quantity } = req.body;

    try {

        let cart = await Cart.findOne()

        if (!cart) {
            cart = new Cart({ product: [] })
        }
        const productIndex = cart.products.findIndex(val => productId ==  val.product );

        if (productIndex > -1) {
            cart.products[productIndex].quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }

        await cart.save();
        res.json({
            message: 'cart added successfully!',
            cart,
        });


    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }


}


exports.getCart = async (req, res) => {

    try {

        const cart =await Cart.findOne().populate('products.product')

        if (!cart.products || cart.products.length === 0) {
            res.status(401).json({
                message: "Cart is Empty",
                cart
            });
        }

        res.status(200).json({
            message: "Cart fetched Successfully",
            cart
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }

}

exports.updateCart = async (req, res) => {

    try {

        const {quantity} = req.body;

        const cart = await Cart.findOne();
        const productIndex = cart.products.findIndex(p => p._id == req.params.id);
    
        if (productIndex > -1) {
          cart.products[productIndex].quantity += quantity;
        }
    
        await cart.save();
        res.json({
          message: 'Cart updated successfully!',
          cart,
        });
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.deleteCart = async (req, res) => {
    try {

        const cart = await Cart.findOne()

        cart.products = cart.products.filter(val => val._id != req.params.id )

        await cart.save()

        res.status(201).json({
            message : "Cart Deleted successfully",
            cart
        })

    } catch (error) {
         res.status(500).json({
            message : error.message
         })
    }
}

exports.clearCart = async (req, res) => {
    try {
        
        const cart = await Cart.findOne()

        cart.products = []

        cart.save()

        res.status(201).json({
           message : "Cart Cleared Successfully",
           cart 
        })

    }catch (error) {
        res.status(500).json({
           message : error.message
        })
   }
}