
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import contentRoutes from './routes/content';
import topicRoutes from './routes/topics';
import fileRoutes from './routes/files';
import authMiddleware from './middleware/auth';
import loggerMiddleware from './middleware/logger';
import { Database } from '../types/supabase';

// Load environment variables
dotenv.config();

// Create Express server
const app = express();
const PORT = process.env.PORT || 4000;

// Create Supabase client for backend use
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(loggerMiddleware);

// API Routes
app.use('/api/content', authMiddleware, contentRoutes);
app.use('/api/topics', authMiddleware, topicRoutes);
app.use('/api/files', authMiddleware, fileRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});

export default app;
