require("dotenv").config();

const express = require('express')
const cors = require('cors')
const mongoose = require("mongoose");
const register = require("./routes/register")
const bodyParser = require('body-parser');
const login = require("./routes/login")
const users = require("./routes/users")
const stripe = require("./routes/stripe")
const productsRoute = require("./routes/product")
const products = require('./products');
const  order = require("./routes/orders");
const app =  express();




app.use(express.json())   // Express application to parse incoming requests with JSON payloads.
app.use(cors())
// app.use(bodyParser.json());

app.use('/api/register',register);
app.use('/api/login',login);
app.use('/api/stripe',stripe);
app.use('/api/products',productsRoute);
app.use('/api/users',users);
app.use('/api/orders',order);


app.get("/",(req,res)=>{
    res.send('welcome to our online shop')
})
app.get("/products",(req,res)=>{
    res.send(products)
})


const port = process.env.PORT || 5000
const uri = process.env.DB_URL;
mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology:true,


}).then(()=> console.log("Mongodb connection successfull"))
.catch((err)=> console.error(err));


app.listen(port,console.log(`server running on port ${port}`))