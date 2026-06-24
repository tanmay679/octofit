import { Router } from 'express';
import WorkoutModel from '../models/workout';

const router = Router();

router.get('/', async (_req, res) => {
  const items = await WorkoutModel.find().sort({ createdAt: -1 }).lean();
  res.json({ resource: 'workouts', count: items.length, items });
});

export default router;
