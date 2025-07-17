import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
    try {
        const { name, email, phone, password, role } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists." });
        }

        // Hash password for all users (both customers and admins)
        const saltRounds = 10;
        const finalPassword = await bcrypt.hash(password, saltRounds);

        const user = await User.create({ name, email, phone, password: finalPassword, role });

        res.status(201).json({ success: true, user, token: generateToken(user) });
    } catch (error) {
        console.error("❌ Error registering user:", error);
        res.status(500).json({ success: false, message: "Server error during registration." });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: "User not found." });
        }

        // Check if the user role matches the requested role
        if (role && user.role !== role) {
            return res.status(401).json({ 
                success: false, 
                message: `Access denied. This login is for ${role}s only.` 
            });
        }

        // Use bcrypt to compare passwords for all users
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid email or password." });
        }

        const token = generateToken(user);
        res.json({ 
            success: true, 
            token, 
            user: { 
                id: user._id, 
                name: user.name,
                email: user.email, 
                role: user.role 
            } 
        });

    } catch (error) {
        console.error("❌ Error during login:", error);
        res.status(500).json({ success: false, message: "Server error during login." });
    }
};