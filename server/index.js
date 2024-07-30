// index.js
import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(cors());
app.use(express.json());

// Routes
import userRoutes from './routes/user.js';
import productRoutes from './routes/product.js';
import orderRoutes from './routes/order.js';
import reviewRoutes from './routes/review.js';
import cartRoutes from './routes/cart.js';

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/cart', cartRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
