
const Product =  require('../modals/Product')

exports.getAllProducts = async (req, res) => {
    try {
       const Products = await Product.find()
       res.json(Products)
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}

exports.createProduct = async (req, res) => {
    try {

        const {name, price , description, img} = req.body

        const newProduct = await Product({name ,price , description, img})
   
        const saveProduct = await newProduct.save();

        res.status(201).json({
            message : "Product Created Successfully",
            Product : saveProduct
        })

    }catch(error){
        res.status(500).json({
            message : error
        })
    }
}

exports.updateProduct = async (req, res) => {
    try {
        
        const {id} = req.params;

        const {name, price, description , img} = req.body

        const updatedProduct = await Product.findByIdAndUpdate(id, {name, price, description, img})

        res.status(201).json({
            message : "Product Updated Successfully",
            updatedProduct
        })

    }catch(error){
        res.status(500).json({
            message : error
        })
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        
        const {id} = req.params;

        const findId = await Product.findOne({id})

        if(!findId){
            res.status(400).json({
                message : "Product Not Found"
            })
        }

        const deleteProduct = await Product.findByIdAndDelete(id)

        res.status(201).json({
            message : "Product Deleted Successfully",
            deleteProduct
        })

    } catch (error) {
        res.status(500).json({
            message : error
        })
    }
}