require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000; 
const authRoutes = require('./routes/authRoutes')
const productRoutes= require('./routes/productRoutes')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.listen (port, ()=>{
    console.log(`Servidor inciado en  ---> http://localhost:${port}`)
});

app.use('/',authRoutes);
app.use('/',productRoutes);
