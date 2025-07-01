import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const authenticateToken = (req, res, next) => {
    const token = req.cookies.accessToken || req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Access token is missing or invalid" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid access token" });
        }
        req.user = user;
        next();
    });
}

export const refreshAccessToken = (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        if (!token) {
            return res.status(401).json({ message: "Refresh token is missing" });
        }

        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        const newAccessToken = jwt.sign({ _id: decoded._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.json({ accessToken: newAccessToken });

    } catch (error) {
        console.error("Error refreshing access token:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

