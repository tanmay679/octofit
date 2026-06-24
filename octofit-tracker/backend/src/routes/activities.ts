import { Router } from 'express';
import ActivityModel from '../models/activity';

const router = Router();

router.get('/', async (_req, res) => {
  const items = await ActivityModel.find()
    .populate('user', 'name email fitnessLevel')
    .sort({ performedAt: -1 })
    .lean();
  res.json({ resource: 'activities', count: items.length, items });
});

export default router;
