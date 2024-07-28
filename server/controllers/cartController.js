// controllers/cartController.js
import User from '../models/User.js';

// Get user's cart
export const getCart = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('cart.product');
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user.cart);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Add item to cart
export const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const itemIndex = user.cart.findIndex(item => item.product.toString() === productId);
        if (itemIndex >= 0) {
            user.cart[itemIndex].quantity += quantity;
        } else {
            user.cart.push({ product: productId, quantity });
        }

        await user.save();
        res.json(user.cart);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Update cart item
export const updateCartItem = async (req, res) => {
    const { itemId } = req.params;
    const { quantity } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const itemIndex = user.cart.findIndex(item => item._id.toString() === itemId);
        if (itemIndex >= 0) {
            user.cart[itemIndex].quantity = quantity;
        } else {
            return res.status(404).json({ msg: 'Cart item not found' });
        }

        await user.save();
        res.json(user.cart);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
    const { itemId } = req.params;

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        user.cart = user.cart.filter(item => item._id.toString() !== itemId);

        await user.save();
        res.json(user.cart);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
