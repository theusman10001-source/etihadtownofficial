import { Router, Request, Response } from 'express';
import { Plot } from '../models/Plot';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const { phase, block, category, status, plotType } = req.query;

    const filter: Record<string, unknown> = {};

    if (phase && typeof phase === 'string') filter.phase = phase;
    if (block && typeof block === 'string') filter.block = block;
    if (category && typeof category === 'string') filter.category = category;
    if (status && typeof status === 'string') filter.status = status;
    if (plotType && typeof plotType === 'string') filter.plotType = plotType;

    const plots = await Plot.find(filter).sort({ phase: 1, block: 1, plotId: 1 }).lean();

    res.json({ count: plots.length, data: plots });
  } catch (error) {
    console.error('Error fetching plots:', error);
    res.status(500).json({ error: 'Failed to fetch plots' });
  }
});

router.get('/phases', async (_req: Request, res: Response) => {
  try {
    const phases = await Plot.distinct('phase');
    res.json({ data: phases });
  } catch (error) {
    console.error('Error fetching phases:', error);
    res.status(500).json({ error: 'Failed to fetch phases' });
  }
});

router.get('/blocks', async (req: Request, res: Response) => {
  try {
    const { phase } = req.query;
    const filter: Record<string, unknown> = {};
    if (phase && typeof phase === 'string') filter.phase = phase;

    const blocks = await Plot.distinct('block', filter);
    res.json({ data: blocks });
  } catch (error) {
    console.error('Error fetching blocks:', error);
    res.status(500).json({ error: 'Failed to fetch blocks' });
  }
});

export default router;
