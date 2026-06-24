import { InferSchemaType, Schema, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    weekStart: { type: Date, required: true },
  },
  {
    timestamps: true,
  },
);

export type LeaderboardEntry = InferSchemaType<typeof leaderboardSchema>;

const LeaderboardModel = model('Leaderboard', leaderboardSchema);

export default LeaderboardModel;
