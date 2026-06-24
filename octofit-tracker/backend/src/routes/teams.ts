import { Router } from 'express';
import TeamModel from '../models/team';

const router = Router();

router.get('/', async (_req, res) => {
  const items = await TeamModel.find()
    .populate('members', 'name email fitnessLevel')
    .sort({ createdAt: -1 })
    .lean();
  res.json({ resource: 'teams', count: items.length, items });
});

export default router;
