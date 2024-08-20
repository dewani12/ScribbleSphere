import User from '../model/user.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import pkg from 'validator'

const {isEmail} = pkg

const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => { 
    return jwt.sign({ id },process.env.SECRET_KEY_JWT, {
        expiresIn: maxAge
    })
}

export const signup = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        if (!fullname || !email || !password) {
            return res.status(400).json({ mssg: "All fields are required." });
        }

        if (!isEmail(email)) {
            return res.status(400).json({ mssg: "The email address you entered is not valid." });
        }

        if (password.length < 6) {
            return res.status(400).json({ mssg: "Password must be at least 6 characters long." });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ mssg: "User with this email address already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const createdUser = new User({
            fullname,
            email,
            password: hashedPassword
        });

        await createdUser.save();

        const token = createToken(createdUser._id);
        res.cookie('jwt', token, { maxAge: maxAge * 1000 });

        return res.status(201).json({ mssg: "User registered successfully!" });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ mssg: errors.join(', ') });
        }
        console.error("Signup error:", error);
        return res.status(500).json({ mssg: 'An unexpected error occurred.' });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ mssg: "Both email and password are required." });
        }

        if (!isEmail(email)) {
            return res.status(400).json({ mssg: "The email address you entered is not valid." });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ mssg: "No account found with this email address." });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ mssg: "The email or password you entered is incorrect." });
        }

        const token = createToken(user._id);
        res.cookie('jwt', token, { maxAge: maxAge * 1000 });

        return res.status(200).json({ mssg: "User logged in successfully!", email: user.email, name: user.fullname });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ mssg: "An unexpected error occurred." });
    }
};



