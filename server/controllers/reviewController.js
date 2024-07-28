import Product from '../models/Product.js';

// Add a review to a product
export const addReview = async (req, res) => {
    const { rating, comment } = req.body;
    const productId = req.params.productId;

    try {
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        const alreadyReviewed = product.reviews.find(
            r => r.user.toString() === req.user.id.toString()
        );

        if (alreadyReviewed) {
            return res.status(400).json({ msg: 'Product already reviewed' });
        }
        console.log(req.user)
        const review = {
            user: req.user.id,
            name: req.user.name,
            rating: Number(rating),
            comment
        };

        product.reviews.push(review);

        product.numReviews = product.reviews.length;
        product.rating =
            product.reviews.reduce((acc, item) => item.rating + acc, 0) /
            product.reviews.length;

        await product.save();

        res.status(201).json({ msg: 'Review added' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
