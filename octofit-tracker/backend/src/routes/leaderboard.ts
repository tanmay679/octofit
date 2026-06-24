import { Router } from 'express';
import LeaderboardModel from '../models/leaderboard';

const router = Router();

router.get('/', async (_req, res) => {
  const items = await LeaderboardModel.find()
    .populate('user', 'name email')
    .sort({ rank: 1 })
    .lean();
  res.json({ resource: 'leaderboard', count: items.length, items });
});

export default router;
