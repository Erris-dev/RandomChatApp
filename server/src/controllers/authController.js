import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate input 
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists"});
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password,10);

        //Create new user
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        });

        console.log("User created:", newUser);
        return res.status(201).json("User created successfully");
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input 
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // Generate JWT token
        const accessToken = jwt.sign({ _id: user._id}, process.env.JWT_SECRET, { expiresIn: '1h'});
        const refreshToken = jwt.sign({ _id: user._id}, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d'});

        // Set refreshs token in cookies
        res.cookies('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: 'strict', // Prevent CSRF attacks
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })

        res.json({ accessToken, user: { id: user._id, username: user.username, email: user.email } });
    } catch (error) {
        console.error("Error logging in user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const logoutUser = (req, res) => {
    try {
        // Clear the refresh token cookie
        res.clearCookie('refreshToken', {
            httpOnly: true,
            sameSite: 'strict'
        });

        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Error logging out user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
