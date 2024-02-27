import { Schema, model } from 'mongoose';
import { IComment } from '../types/commentType';

// interface IComment extends model {
//   blogId: mongoose.Types.ObjectId;
// }

const SchemaComment = new Schema<IComment>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  comment: { type: String, required: true },
  status: { type: Boolean, required: true, default: true },
  blogId: { type: Schema.Types.ObjectId, ref: 'blog'},
  date: { type: Date, required: true, default: new Date() },
});

export default model<IComment>('Comments', SchemaComment);
