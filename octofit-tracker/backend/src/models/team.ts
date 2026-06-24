import { InferSchemaType, Schema, model } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    totalPoints: { type: Number, required: true, min: 0, default: 0 },
  },
  {
    timestamps: true,
  },
);

export type Team = InferSchemaType<typeof teamSchema>;

const TeamModel = model('Team', teamSchema);

export default TeamModel;
