import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import seller_router from './Routes/vendor_routes.js';
import restro_router from './Routes/Restro_routes.js';
import DBconnect from './middleware/DBconnect.js';
import product_router from './Routes/product_routes.js';
import path from 'path'
dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Database connection
DBconnect();

// Routes
app.use('/vendor', seller_router);
app.use('/restro',restro_router);
app.use('/product',product_router);
app.use('/uploads',express.static('uploads'))

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});