import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { faker } from '@faker-js/faker';
import User from './models/User.js';
import Product from './models/Product.js';
import Order from './models/Order.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const loadData = async () => {
    try {
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();

        const users = [];
        const products = [];
        const orders = [];

        // Create fake users
        for (let i = 0; i < 10; i++) {
            const user = new User({
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
            });
            users.push(user);
        }

        await User.insertMany(users);

        // Create fake products
        const categories = ['Games', 'Books', 'Electronics', 'Clothing', 'Furniture', 'Toys', 'Groceries', 'Beauty', 'Automotive', 'Sports'];
        for (let i = 0; i < 100; i++) {
            const product = new Product({
                name: faker.commerce.productName(),
                description: faker.lorem.sentences(),
                price: faker.commerce.price(),
                category: categories[Math.floor(Math.random() * categories.length)],
                stock: faker.number.int({ min: 0, max: 100 }),
                images: [
                    faker.image.url(),
                    faker.image.url(),
                ],
            });

            // Generate fake reviews for the product
            const reviews = [];
            const numReviews = faker.number.int({ min: 0, max: 10 });
            let ratingSum = 0;

            for (let j = 0; j < numReviews; j++) {
                const review = {
                    user: users[Math.floor(Math.random() * users.length)]._id,
                    name: faker.person.fullName(),
                    rating: faker.number.int({ min: 1, max: 5 }),
                    comment: faker.lorem.sentence(),
                    date: faker.date.recent(),
                };
                reviews.push(review);
                ratingSum += review.rating;
            }

            product.reviews = reviews;
            product.numReviews = numReviews;
            product.rating = numReviews > 0 ? ratingSum / numReviews : 0;

            products.push(product);
        }

        await Product.insertMany(products);

        // Create fake orders
        for (let i = 0; i < 10; i++) {
            const order = new Order({
                user: users[Math.floor(Math.random() * users.length)]._id,
                products: products.slice(0, Math.floor(Math.random() * products.length)).map(product => ({
                    product: product._id,
                    quantity: faker.number.int({ min: 1, max: 5 }),
                })),
                totalAmount: faker.commerce.price(),
            });
            orders.push(order);
        }

        await Order.insertMany(orders);

        console.log('Data Loaded!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
};

loadData();
