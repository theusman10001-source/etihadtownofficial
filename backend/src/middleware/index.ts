import express, { Express } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';

export function configureMiddleware(app: Express): void {
  app.use(helmet());

  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  app.use(
    cors({
      origin: [frontendUrl],
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type'],
    })
  );

  const leadLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { error: 'Too many requests, please try again later' },
    standardHeaders: true,
    legacyHeaders: false,
  });

  const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  });

  app.use('/api/leads', leadLimiter);
  app.use('/api/bookings', leadLimiter);
  app.use('/api', generalLimiter);

  app.use(mongoSanitize());
  app.use(express.json({ limit: '10kb' }));
}
