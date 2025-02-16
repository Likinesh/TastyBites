import R_user from "../Models/Restaurent_User.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

export const verifyToken = async (req, res, next) => {
    const token = req.headers.token;
    if (!token) {
        return res.status(400).json({ error: 'Token is required' });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await R_user.findById(decoded.user_id);
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }
        req.user_id=R_user._id;
        next();
    } catch (err) {
        console.error('Token verification error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
