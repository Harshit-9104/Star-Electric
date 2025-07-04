import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try{
        // check if user exists
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ message: "User does not exist" });
        }

        // check if password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.json({ message: "Invalid password" });
        }
        // create token
        const token = createToken(user._id);
        res.json({ success: true, token});

    }catch (error) {
        console.log(error);
        res.json({ success: false, message: "Internal server error" });
    }
}

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

// register user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try{
        // check if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // validate email format and strong password
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        if(password.length < 8) {
            return res.status(400).json({ message: "please enter strong password" });
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create new user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });
        const user = await newUser.save();
        // create token
        const token = createToken(user._id);
        res.json({success:true, token})


    }catch (error) {
        console.log(error);
        res.json({ success: false, message: "Internal server error" });
    }
}

export { loginUser, registerUser }; 