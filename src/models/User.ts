import { Schema, model, Document } from 'mongoose';
import { IUser } from '../types/userType';

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, default: "user", enum: ['user', 'admin'] }
});

export default model<IUser>('IUser', userSchema);
