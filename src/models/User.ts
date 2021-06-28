import mongoose, { Document } from 'mongoose'

export type UserDocument = Document & {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
)

export default mongoose.model<UserDocument>('User', userSchema)
