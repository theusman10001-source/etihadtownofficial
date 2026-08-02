import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import { configureMiddleware } from './middleware';
import plotsRouter from './routes/plots';
import pricePlansRouter from './routes/pricePlans';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

configureMiddleware(app);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/plots', plotsRouter);
app.use('/api/price-plans', pricePlansRouter);

async function start() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

start();

export default app;
