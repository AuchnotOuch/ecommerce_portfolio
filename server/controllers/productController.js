import Product from '../models/Product.js';

// Add a new product
export async function addProduct(req, res) {
    const { name, description, price, category, stock } = req.body;

    try {
        const newProduct = new Product({
            name,
            description,
            price,
            category,
            stock,
        });

        const product = await newProduct.save();
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

// Get all products
export async function getProducts(req, res) {
    try {
        const products = await find();
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

// Get product by ID
export async function getProductById(req, res) {
    try {
        const product = await findById(req.params.id);

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
}
