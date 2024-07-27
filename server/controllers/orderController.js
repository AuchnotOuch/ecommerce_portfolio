import Order, { find } from '../models/Order';

// Place a new order
export async function placeOrder(req, res) {
    const { user, products, totalAmount } = req.body;

    try {
        const newOrder = new Order({
            user,
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
        const orders = await find({ user: req.params.userId }).populate('products.product');

        if (!orders) {
            return res.status(404).json({ msg: 'No orders found' });
        }

        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}
