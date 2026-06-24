import mongoose from 'mongoose';

const mongoUri = 'mongodb://localhost:27017/octofit_db';

export const connectDatabase = async (): Promise<void> => {
  await mongoose.connect(mongoUri);
};
