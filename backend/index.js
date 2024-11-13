import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { createProxyMiddleware } from 'http-proxy-middleware';
import cookieParser from "cookie-parser";
import { PythonShell } from 'python-shell';  // Import python-shell

import UserRoutes from './routes/UserRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(cookieParser());

// Proxy setup
app.use('/api/nominatim', createProxyMiddleware({
    target: 'https://nominatim.openstreetmap.org',
    changeOrigin: true,
    pathRewrite: { '^/api/nominatim': '' },
    onProxyRes: (proxyRes) => {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
        proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
        proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
        proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
    }
}));

// Routes
app.use('/auth', UserRoutes);

// POST endpoint to handle prediction requests
app.post('/predict', (req, res) => {
    const { engineSize, cylinders, make, vehicleClass, transmission, fuelType } = req.body;
    
    // Prepare the input data for prediction
    const input = {
        'ENGINE SIZE': engineSize,
        'CYLINDERS': cylinders,
        [`MAKE_${make}`]: 1,
        [`VEHICLE CLASS_${vehicleClass}`]: 1,
        [`TRANSMISSION_${transmission}`]: 1,
        [`FUEL_${fuelType}`]: 1
    };

    // Convert the input data to a JSON string
    const inputData = JSON.stringify(input);

    // Run the Python script and pass the input data
    PythonShell.run('predict.py', { args: [inputData] }, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error in prediction' });
        }

        // Send the prediction result
        res.json({ prediction: results[0] });
    });
});

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((error) => console.error("MongoDB connection error:", error));
