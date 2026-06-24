import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import activitiesRoutes from './routes/activities';
import healthRoutes from './routes/health';
import leaderboardRoutes from './routes/leaderboard';
import teamsRoutes from './routes/teams';
import usersRoutes from './routes/users';
import workoutsRoutes from './routes/workouts';

const app = express();

const port = 8000;
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const apiBaseUrl = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(cors());
app.use(express.json());

app.use('/api', healthRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/teams', teamsRoutes);
app.use('/api/activities', activitiesRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/workouts', workoutsRoutes);

app.get('/', (_req, res) => {
  res.json({
    message: 'OctoFit Tracker backend is running',
    apiBaseUrl,
    endpoints: [
      `${apiBaseUrl}/api/users`,
      `${apiBaseUrl}/api/teams`,
      `${apiBaseUrl}/api/activities`,
      `${apiBaseUrl}/api/leaderboard`,
      `${apiBaseUrl}/api/workouts`,
    ],
  });
});

export const startServer = async (): Promise<void> => {
  try {
    await mongoose.connect(mongoUri);
    console.log(`Connected to MongoDB at ${mongoUri}`);
  } catch (error) {
    console.error('MongoDB connection failed, starting API anyway.', error);
  }

  app.listen(port, () => {
    console.log(`Backend listening on port ${port}`);
    console.log(`API URL: ${apiBaseUrl}`);
  });
};
