const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModel');


const app = express();

app.use(express.json());

app.get('/', (req, res) =>{
    res.send('Hello World!');
})


app.get('/blogs', (req, res) =>{
    res.send('Hello from blogs');
})


app.get('/products', async (req, res) =>{
   try {
    
    
    const products = await Product.find({});
      
    res.status(200).json(products);

    
   } catch (error) {
    res.status(500).json({message: error.message});
    
   }
})


app.get('/products/:id', async (req,res) =>{
    try {
        const products = await Product.findById(req.params.id);
        if(!products){
            return res.status(404).json({message: `Cannot find product with id ${req.params.id}`});
        }
        res.status(200).json(products);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
        }
})




app.post('/products', async (req,res) =>{
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    }catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
 
})

//update a product 
app.put('/products/:id', async (req, res) => {
    try {
        const {id} = req.params 
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message: `Cannot find product with id ${id}`});
        }
        res.status(200).json({message: `Product with id ${product.id} updated successfully`});

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
        
    }
})

app.delete('/product/:id', async(req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndDelete(id);
        if(product){
            return res.status(200).json({message: 'Product deleted successfully'});
        }else{
            res.status(404).send({message: 'Product not found'});
        }

          
    } catch (error) { 
        console.log(error);
        res.status(404).send({message: error.message});
        
    }
})





mongoose.connect
('mongodb+srv://admin:123456arbnor@cluster0.xr1y3vr.mongodb.net/Crud?retryWrites=true&w=majority')
.then(() =>{
    console.log('database connected successfully');
app.listen(3500, ()=>{
    console.log('listening on port 3500');
})
}).catch(err=> 
console.log(err));