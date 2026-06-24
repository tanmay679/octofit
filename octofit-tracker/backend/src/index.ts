import cors from 'cors';
import express from 'express';
import healthRoutes from './routes/health';
import mongoose from 'mongoose';

const app = express();

const port = Number(process.env.PORT) || 8000;
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';

app.use(cors());
app.use(express.json());

app.use('/api', healthRoutes);

app.get('/', (_req, res) => {
  res.json({ message: 'OctoFit Tracker backend is running' });
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
  });
};

void startServer();
