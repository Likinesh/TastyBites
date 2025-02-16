import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs';
import R_user from '../Models/Restaurent_User.js';
import dotenv from 'dotenv';

dotenv.config();

export const user_reg = async(req,res)=>{
    const {username,email,password} = req.body;
    try {
        const existingUser = await R_user.findOne({ email });
        if (existingUser) {
            return res.status(400).json("Email already registered");
        }
        const hash_password = await bcrypt.hash(password, 10);
        const new_user = new R_user({ username, email, hash_password });
        await new_user.save();
        console.log("Created New vendor: ", username);
        return res.status(201).json({ message: "Successfully registered" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
export const user_login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const r_user = await R_user.findOne({ email });
        if (!r_user || !(await bcrypt.compare(password, r_user.hash_password))) {
            return res.status(401).json({ error: "Invalid Email or Password" });
        }
        const token = jwt.sign({ user_id: R_user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
        console.log("Currently Login: ", email);
        return res.status(200).json({ message: "Login Successful", token });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getAllusers = async(req,res)=>{
    try {
        const vendors = await R_user.find().populate('restaurents');
        return res.status(200).json({vendors});
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getuserByID = async(req,res)=>{
    const id = req.params.id;
    try {
        const vendor = await R_user.findById(id).populate('restaurents');
        if(!vendor){
            return res.status(404).json({ error: "Vendor Not Found" });
        }
        res.status(200).json({vendor});
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}