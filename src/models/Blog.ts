import { Schema, model } from 'mongoose';
import { IBlog } from '../types/blogType';


const Blog = new Schema<IBlog>({
  title: { type: String, required: true },    
  image: { type: String  }, 
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  likes:  { type: Number, default: 0 }
});
 
export default model<IBlog>('Blog', Blog);
