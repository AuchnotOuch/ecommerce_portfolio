import Order from '../models/Order.js';

// Place a new order
export async function placeOrder(req, res) {
    const { products, totalAmount } = req.body;

    try {
        const newOrder = new Order({
            user: req.user.id,
            products,
            totalAmount,
        });

        const order = await newOrder.save();
        res.json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

// Get orders by user ID
export async function getOrdersByUserId(req, res) {
    try {
        const orders = await Order.find({ user: req.user.id }).populate('products.product');
        console.log(orders)
        if (!orders) {
            return res.status(404).json({ msg: 'No orders found' });
        }

        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}
