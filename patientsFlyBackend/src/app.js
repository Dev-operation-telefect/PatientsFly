import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import connectDB from './database/dbConnection.js';
import cookieSession from 'cookie-session';
import passport from 'passport';
import './config/passport.js';

import authRoutes from './routes/users/authRoutes.js';
import blogRoutes from './routes/blogPost/blogRoutes.js';
import companyRoutes from './routes/company/companyRoutes.js';
import appointmentsRoutes from './routes/appointments/appointmentsRoutes.js';
import teammateRoutes from './routes/teammate/teammateRoutes.js';
import contactRoutes from './routes/contactMassage/contactRoutes.js';
import hospitalRoutes from './routes/hospitalPartner/hospitalRoutes.js';
import reviewRoutes from './routes/patientReviews/reviewRoutes.js';
import videoRoutes from './routes/videoReview/videoRoutes.js';


// Initialize the express application
dotenv.config();
const app = express();

// Database connection
connectDB();

// Middlewares
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// 7-30-2025 add this
app.use(express.urlencoded({ extended: true }));
// Middleware for parsing JSON and URL-encoded data
app.use(cookieSession({
  name: 'session',
  keys: ['google_auth_key'],
  maxAge: 24 * 60 * 60 * 1000
}));

app.use(passport.initialize());
app.use(passport.session());

// Define rate limiter middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

// Apply the rate limiter to all requests
app.use(limiter);

// Routes
app.use('/api/air-ambulance/v1/auth', authRoutes);
app.use('/api/air-ambulance/v1/blog', blogRoutes);
app.use("/api/air-ambulance/v1/companies", companyRoutes);
app.use("/api/air-ambulance/v1/appointments", appointmentsRoutes);
app.use("/api/air-ambulance/v1/teammates", teammateRoutes);
app.use("/api/air-ambulance/v1/contact", contactRoutes);
app.use("/api/air-ambulance/v1/hospitals", hospitalRoutes);
app.use("/api/air-ambulance/v1/reviews", reviewRoutes);
app.use("/api/air-ambulance/v1/reviews-videos", videoRoutes);









// Default route
app.get('/', (req, res) => {
  res.send('Server is running -- Welcome to Telefect API');
});

// Handle undefined routes
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

// Export the app as the default export
export default app;
