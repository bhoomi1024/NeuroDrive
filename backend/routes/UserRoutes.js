import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';
import UserModel from "../models/UserModel.js";


const router = express.Router();

// Register Route
router.post('/user/register', async (req, res) => {
  const { ownerName, password, email, phone} = req.body;

  try {
    let user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new UserModel({
      ownerName,
      password: hashedPassword,
      phone,
      email,
      
    });

    await user.save();
    return res.json({ status: true, message: "User registered successfully" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
});

// Login Route
router.post('/UserLogin', async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User is not registered" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Password is incorrect" });
    }

    const token = jwt.sign({ id: user._id }, process.env.KEY, { expiresIn: "1h" });
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // 1 hour in milliseconds

    return res.json({ status: true, message: "Login successful" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
});

// Forgot Password Route
router.post('/UserForgotPasswordDialog', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.json({ message: "User not registered" });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'vermabhoomi10248932@gmail.com',
        pass: 'fzzk drtd xspp zirk'
      }
    });

    const token = jwt.sign({ id: user._id }, process.env.KEY, { expiresIn: "1h" });

    const mailOptions = {
      from: 'vermabhoomi10248932@gmail.com',
      to: email,
      subject: 'Reset Your GreenBin Password',
      text: `Hi,

We received a request to reset your GreenBin password. If you made this request, please click the link below to set a new password.

If you didn't request a password reset, please ignore this email or let us know.

http://localhost:5173/UserResetPassword/${token}

Thank you for being a part of the GreenBin community!

Best regards,
The GreenBin Team`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.json({ message: "Error sending email" });
      } else {
        console.log("Email sent:", info.response);
        return res.json({ status: "success", message: "Email sent" });
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
});

// Reset Password Route
router.post('/UserResetPassword/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.KEY);
    const id = decoded.id;

    const hashedPassword = await bcrypt.hash(password, 10);
    await UserModel.findOneAndUpdate({ _id: id }, { password: hashedPassword });

    return res.json({ status: 'success', message: 'Password updated' });
  } catch (err) {
    console.error(err);
    return res.json({ message: 'Invalid Token' });
  }
});

// Middleware to Verify User
export const AuthenticateUser = async (req, res, next) => {
  try {
    const token = req.cookies.token; // Retrieve token from cookies
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    
    const verifyToken = jwt.verify(token, process.env.KEY);
    const rootUser = await UserModel.findOne({ _id: verifyToken.id });
    
    if (!rootUser) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }
    
    req.token = token;
    req.rootUser = rootUser;
    req.UserId = rootUser._id;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
}
//Logout
router.get('/UserLogout',(req,res)=>{
  res.clearCookie('token')
  return res.json({status: true})
})

// Dashboard Route
/*router.get('/UsersRestaurant', AuthenticateUser, async (req, res) => {
  try {
    if (!req.rootUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(req.rootUser);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});*/

export default router;