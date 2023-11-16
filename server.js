require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
const productRoutes = require('./routes/products')
const cartRoutes = require('./routes/cart')
const app = express()
const PORT = process.env.PORT || 4000
console.log('Mongo URI:', process.env.MONGO_URI);


app.use(cors({
    origin: '*',
}));


app.use((req, res, next) => {
    console.log(req.path, req.method)
    next();
})

app.use(express.json())


app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes)


mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log('Connected to db, listening on port', PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    })



