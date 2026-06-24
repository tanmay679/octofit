import mongoose from 'mongoose';
import ActivityModel from '../models/activity';
import LeaderboardModel from '../models/leaderboard';
import TeamModel from '../models/team';
import UserModel from '../models/user';
import WorkoutModel from '../models/workout';

const mongoUri = 'mongodb://127.0.0.1:27017/octofit_db';

const seed = async () => {
  console.log('Seed the octofit_db database with test data');

  await mongoose.connect(mongoUri);

  await Promise.all([
    ActivityModel.deleteMany({}),
    LeaderboardModel.deleteMany({}),
    TeamModel.deleteMany({}),
    WorkoutModel.deleteMany({}),
    UserModel.deleteMany({}),
  ]);

  const users = await UserModel.insertMany([
    {
      name: 'Aarav Patel',
      email: 'aarav.patel@octofit.test',
      age: 28,
      fitnessLevel: 'intermediate',
      goals: ['Improve 5K pace', 'Increase stamina'],
    },
    {
      name: 'Maya Chen',
      email: 'maya.chen@octofit.test',
      age: 32,
      fitnessLevel: 'advanced',
      goals: ['Build lean muscle', 'Mobility consistency'],
    },
    {
      name: 'Liam Johnson',
      email: 'liam.johnson@octofit.test',
      age: 24,
      fitnessLevel: 'beginner',
      goals: ['Weight management', 'Daily movement habit'],
    },
    {
      name: 'Sofia Alvarez',
      email: 'sofia.alvarez@octofit.test',
      age: 30,
      fitnessLevel: 'intermediate',
      goals: ['Half marathon prep', 'Core strength'],
    },
  ]);

  const teams = await TeamModel.insertMany([
    {
      name: 'Morning Milers',
      description: 'Cardio-first team that trains before work.',
      members: [users[0]._id, users[3]._id],
      totalPoints: 980,
    },
    {
      name: 'Strength Syndicate',
      description: 'Focused on progressive overload and conditioning.',
      members: [users[1]._id, users[2]._id],
      totalPoints: 860,
    },
  ]);

  const now = new Date();
  await ActivityModel.insertMany([
    {
      user: users[0]._id,
      type: 'run',
      durationMinutes: 42,
      caloriesBurned: 460,
      distanceKm: 7.1,
      performedAt: new Date(now.getTime() - 1000 * 60 * 60 * 24),
    },
    {
      user: users[1]._id,
      type: 'strength',
      durationMinutes: 55,
      caloriesBurned: 390,
      distanceKm: 0,
      performedAt: new Date(now.getTime() - 1000 * 60 * 60 * 30),
    },
    {
      user: users[2]._id,
      type: 'cycle',
      durationMinutes: 38,
      caloriesBurned: 320,
      distanceKm: 14.6,
      performedAt: new Date(now.getTime() - 1000 * 60 * 60 * 10),
    },
    {
      user: users[3]._id,
      type: 'hiit',
      durationMinutes: 27,
      caloriesBurned: 300,
      distanceKm: 0,
      performedAt: new Date(now.getTime() - 1000 * 60 * 60 * 4),
    },
  ]);

  const weekStart = new Date(now);
  weekStart.setHours(0, 0, 0, 0);
  weekStart.setDate(weekStart.getDate() - weekStart.getDay());

  await LeaderboardModel.insertMany([
    { user: users[3]._id, points: 540, rank: 1, weekStart },
    { user: users[0]._id, points: 500, rank: 2, weekStart },
    { user: users[1]._id, points: 470, rank: 3, weekStart },
    { user: users[2]._id, points: 410, rank: 4, weekStart },
  ]);

  await WorkoutModel.insertMany([
    {
      title: 'Tempo Run Builder',
      focusArea: 'Cardio Endurance',
      difficulty: 'intermediate',
      durationMinutes: 45,
      instructions: [
        'Warm up jog for 10 minutes.',
        'Run 20 minutes at tempo pace.',
        'Cooldown walk and stretch for 15 minutes.',
      ],
    },
    {
      title: 'Total Body Strength Circuit',
      focusArea: 'Strength',
      difficulty: 'advanced',
      durationMinutes: 50,
      instructions: [
        'Complete 4 rounds of squats, pushups, and rows.',
        'Rest 60 seconds between rounds.',
        'Finish with core finisher plank variations.',
      ],
    },
    {
      title: 'Beginner Mobility Flow',
      focusArea: 'Mobility',
      difficulty: 'beginner',
      durationMinutes: 25,
      instructions: [
        'Start with dynamic hip openers for 5 minutes.',
        'Do guided thoracic rotations and hamstring flow.',
        'End with deep breathing and recovery stretches.',
      ],
    },
  ]);

  console.log('Inserted sample data for users, teams, activities, leaderboard, and workouts.');
  console.log(`Teams seeded: ${teams.length}`);

  await mongoose.disconnect();
};

void seed()
  .then(() => {
    console.log('Seed completed successfully.');
  })
  .catch(async (error) => {
    console.error('Seed failed.', error);
    await mongoose.disconnect();
    process.exitCode = 1;
  });
