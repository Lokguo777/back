import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from '@/config/env';
import routes from '@/routes';
import { errorHandler, notFoundHandler } from '@/middleware/error';

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: env.CORS_ORIGIN,
  credentials: true,
}));

// Logging middleware
app.use(morgan('combined'));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// API routes
app.use('/api', routes);

// Error handling middleware (must be last)
app.use(notFoundHandler);
app.use(errorHandler);

export default app; 