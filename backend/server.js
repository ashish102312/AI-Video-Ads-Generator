const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
require('dotenv').config();

// Config imports
const connectDB = require('./config/db');
// const redisClient = require('./config/redis');

// Connect Database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware Setup
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173', credentials: true }));
// Body parser configurations with limits to prevent payload bloat
app.use(express.json({ limit: '15kb' }));
app.use(express.urlencoded({ extended: true, limit: '15kb' }));
app.use(morgan('dev')); // Logger
app.use(compression()); // Compress all responses to make API faster and save bandwidth

// Rate Limiting to prevent brute-force and DDoS
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 150, // Limit each IP to 150 requests per windowMs
    message: { success: false, message: 'Too many requests from this IP, please try again after 15 minutes' },
    standardHeaders: true,
    legacyHeaders: false,
});
app.use('/api', apiLimiter);

// Health Check Route
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'API is running', timestamp: new Date() });
});

// Define Routes
app.use('/api/v1/auth', require('./routes/auth.routes'));
app.use('/api/v1/videos', require('./routes/video.routes'));
app.use('/api/v1/admin', require('./routes/admin.routes'));
// app.use('/api/v1/analytics', require('./routes/analytics.routes'));
// app.use('/api/v1/subscription', require('./routes/subscription.routes'));

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
});

app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`✅ Environment: ${process.env.NODE_ENV || 'development'}`);
});
