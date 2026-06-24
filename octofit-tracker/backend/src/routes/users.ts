import { Router } from 'express';
import UserModel from '../models/user';

const router = Router();

router.get('/', async (_req, res) => {
  const items = await UserModel.find().sort({ createdAt: -1 }).lean();
  res.json({ resource: 'users', count: items.length, items });
});

export default router;
