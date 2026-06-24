import { InferSchemaType, Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    focusArea: { type: String, required: true, trim: true },
    difficulty: {
      type: String,
      required: true,
      enum: ['beginner', 'intermediate', 'advanced'],
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    instructions: [{ type: String, required: true, trim: true }],
  },
  {
    timestamps: true,
  },
);

export type Workout = InferSchemaType<typeof workoutSchema>;

const WorkoutModel = model('Workout', workoutSchema);

export default WorkoutModel;
