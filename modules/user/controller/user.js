import bcrypt from 'bcryptjs'
import { asyncHandler } from '../../../Service/errorHandling.js';
import {userModel} from '../../../DB/models/user.model.js'
import jwt from 'jsonwebtoken';
import { sendEmail } from "../../../Service/sendEmail.js";
import {generateNumericCode}from '../../../Service/generateNumericCode.js'


export const signUp = asyncHandler(async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const user = await userModel.findOne({ email }).select("email");
        if (user) {
            return res.status(400).json({ message: "Email exists" });
        } else {
            const hashPassword = await bcrypt.hash(password, parseInt(process.env.saltRound));
            const newUser = new userModel({
                name,
                email,
                password: hashPassword,
            });
            const savedUser = await newUser.save();
            const token = jwt.sign({
                id: savedUser._id },
                process.env.TOKENSIGNATURE, 
                { expiresIn: '1d' 
            })
            res.status(201).json({ message: "User registered successfully", token });
        }
    } catch (error) {
        res.status(500).json({ message: "Error", error: error.message });
        console.log(error);
    }
})


export const signIn = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid account" });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = jwt.sign(
            { id: user._id, isLoggedIn: true },
            process.env.TOKENSIGNATURE,
            { expiresIn: '24h' }
        );
        console.log(token);
        await userModel.updateOne({ _id: user._id }, { online: true, lastSeen: new Date() });
        res.status(200).json({
            message: 'User is logged in',
            token,
            name: user.name
        });
    } catch (error) {
        res.status(500).json({ message: "Catch error", error: error.message });
    }
});

export const sendCode = asyncHandler(async (req, res) => {
        const user = req.user
        if ( user.blocked) {
        return res.status(400).json({
            message: "Can't send code to a non-registered or blocked account",
        });
        }
        const code = generateNumericCode(6);
        await userModel.updateOne(
            { _id: user._id },
            { code }
        )
        
        console.log('Sending email to:', user.email);
        if (user.email) {
        sendEmail(
            user.email,
            "Forgot Password",
            `<h1>Dear ${user.name}, please use this code: ${code} to reset your password</h1>`
        );
        } else {
        return res.status(400).json({ message: "User email is not defined" });
        }
    
        res.status(201).json({ message: "Code sent successfully" })
})


export const forgetPassword = asyncHandler(async (req, res) => {
        const { code, password } = req.body
        const user = req.user
        if (!user) {
        return res.status(400).json({ message: "Not registered account" })
        }
        if (user.code !== code) {
            return res.status(400).json({ message: "Invalid code" })
            }
        const isSamePassword = await bcrypt.compare(password, user.password)
        if (isSamePassword) {
        return res.status(400).json({ message: "Please enter a new password" })
        }
        if (!process.env.SaltRound) {
            console.error('SaltRound is not defined in .env file');
            return res.status(500).json({ message: "Internal server error" });
        }
        const hashPassword = await bcrypt.hash(password, parseInt(process.env.SaltRound))
        await userModel.updateOne(
        { _id: user._id },
        {
            password: hashPassword,
            code: null 
        }
        )
        res.status(201).json({ message: "Password updated successfully" })
    })