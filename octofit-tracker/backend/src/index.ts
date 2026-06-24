import cors from 'cors';
import express from 'express';
import healthRoutes from './routes/health';
import mongoose from 'mongoose';
import usersRoutes from './routes/users';
import teamsRoutes from './routes/teams';
import activitiesRoutes from './routes/activities';
import leaderboardRoutes from './routes/leaderboard';
import workoutsRoutes from './routes/workouts';

const app = express();

const port = 8000;
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
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
    apiBaseUrl: baseUrl,
    endpoints: [
      `${baseUrl}/api/users`,
      `${baseUrl}/api/teams`,
      `${baseUrl}/api/activities`,
      `${baseUrl}/api/leaderboard`,
      `${baseUrl}/api/workouts`,
    ],
  });
});

const startServer = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log(`Connected to MongoDB at ${mongoUri}`);
  } catch (error) {
    console.error('MongoDB connection failed, starting API anyway.', error);
  }

  app.listen(port, () => {
    console.log(`Backend listening on port ${port}`);
    console.log(`API base URL: ${baseUrl}`);
  });
};

void startServer();
