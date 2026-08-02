import { Router, Request, Response } from 'express';
import { PricePlan } from '../models/PricePlan';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const { phase, block, sizeMarla } = req.query;

    const filter: Record<string, unknown> = {};
    if (phase && typeof phase === 'string') filter.phase = phase;
    if (block && typeof block === 'string') filter.block = block;
    if (sizeMarla) filter.sizeMarla = Number(sizeMarla);

    const plans = await PricePlan.find(filter).sort({ phase: 1, block: 1, sizeMarla: 1 }).lean();

    res.json({ count: plans.length, data: plans });
  } catch (error) {
    console.error('Error fetching price plans:', error);
    res.status(500).json({ error: 'Failed to fetch price plans' });
  }
});

export default router;
