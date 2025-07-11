import User from '../models/userSchema.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cloudinary from '../lib/cloudinary.js'

export const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

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
        const accessToken = jwt.sign({ _id: user._id}, process.env.JWT_SECRET, { expiresIn: '15m'});
        const refreshToken = jwt.sign({ _id: user._id}, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d'});

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            sameSite: 'Strict',
            maxAge: 15 * 60 * 1000 // 15 minutes
        });     

        // Set refreshs token in cookies
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: 'strict', // Prevent CSRF attacks
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })

        res.json({ accessToken,
             user: { id: user._id, username: user.username, email: user.email, avatar: user.avatar,
                 gender: user.gender, location: user.location, profession: user.profession } });
    } catch (error) {
        console.error("Error logging in user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getMe = async (req, res) => {
  try {
    const userId = req.user._id; // injected by auth middleware
    const user = await User.findById(userId).select("-password"); // exclude password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const logoutUser = (req, res) => {
    try {

        res.clearCookie('accessToken', {
            httpOnly: true,
            sameSite: 'Strict'
        });
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

export const updateUser = async (req,res) => {
    try {
        const userId = req.user._id;
        const { username, location , profession , gender, avatar } = req.body;
        
        const existingUser = await User.findById(userId);
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        let avatarUrl = existingUser.avatar;

        // Step 2: Check if avatar is a new base64 image
        const isBase64 = typeof avatar === "string" && avatar.startsWith("data:image");

        if (isBase64 && avatar !== existingUser.avatar) {
            const uploadedRes = await cloudinary.uploader.upload(avatar);
            avatarUrl = uploadedRes.secure_url;
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                username,
                location,
                profession,
                gender,
                avatar: avatarUrl, 
            },
            { new: true }
        );

        return res.status(200).json(updatedUser);
    } catch (error){
        console.error("Error updating user:", error);
        return res.status(500).json({ message: "Server error" });
    }
}

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.error("Error checking authentication:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

