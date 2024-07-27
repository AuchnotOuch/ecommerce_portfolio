import express, { json } from 'express';
import connectDB from './config/db';
import cors from 'cors';
require('dotenv').config();

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(json({ extended: false }));
app.use(cors());

// Define Routes
app.use('/api/users', require('./routes/user').default);
app.use('/api/products', require('./routes/product').default);
app.use('/api/orders', require('./routes/order'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
