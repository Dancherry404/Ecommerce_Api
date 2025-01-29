const express = require('express')
const mongoose = require('mongoose')
const dotenv = require("dotenv")
const bodyParser = require('body-parser')



const app = express()
app.use(express.json());
app.use(bodyParser.json())
dotenv.config()

mongoose.connect(process.env.MONGO_URI,
    {useNewUrlParser : 'true', useUnifiedTopology : true, connectTimeoutMS: 60000,
        socketTimeoutMS: 60000, 
      }
).then(() => console.log("MongoDB Connected")).catch((error) => console.error(error))

//Imports Routes

const ProductRoutes = require("./routers/ProductRoute")
const CartRoutes = require("./routers/CartRouter")

app.use('/products', ProductRoutes)
app.use('/carts',CartRoutes)

app.use('/',(req, res) => {
    res.send("Welcome to Ecommerce Api")
})  

const PORT = process.env.PORT || 5000;

app.listen(PORT,() => console.log(`Serve connected PORT ${PORT}`))