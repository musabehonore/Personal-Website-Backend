import { Schema, model } from 'mongoose';
import { IQueries } from '../types/queriesType';

const QueriesSchema = new Schema<IQueries>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

export default model<IQueries>('Queries', QueriesSchema);
