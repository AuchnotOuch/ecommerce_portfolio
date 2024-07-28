import Product from '../models/Product.js';

// Add a new product
export const addProduct = async (req, res) => {
    const { name, description, price, category, stock, images } = req.body;

    try {
        const newProduct = new Product({
            name,
            description,
            price,
            category,
            stock,
            images
        });

        const product = await newProduct.save();
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get all products
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get product by ID
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        res.json(product);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.status(500).send('Server error');
    }
};

// Find related products
export const getRelatedProducts = async (req, res) => {
    const { categories } = req.query;
    if (!categories) {
        return res.status(400).json({ msg: 'Categories query parameter is required' });
    }

    try {
        const categoryArray = categories.split(',');
        const relatedProducts = await Product.find({ category: { $in: categoryArray } }).limit(6);
        res.json(relatedProducts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
