import User from '../models/User.js';
import pkg from 'bcryptjs';
import jwt from 'jsonwebtoken';
const { genSalt, hash, compare } = pkg;

// Register a new user
export async function registerUser(req, res) {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            name,
            email,
            password,
        });

        const salt = await genSalt(10);
        user.password = await hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id,
                name: user.name, // Include the name in the payload
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

// Login a user
export async function loginUser(req, res) {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }
        console.log(user)
        const payload = {
            user: {
                id: user.id,
                name: user.name
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token, user });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

// Get Current User
// export async function getUser(req, res) {
//     const {}
// }
