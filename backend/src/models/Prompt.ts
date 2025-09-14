import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IPrompt extends Document {
  user_id: Types.ObjectId;
  category_id: Types.ObjectId;
  sub_category_id: Types.ObjectId;
  prompt: string;
  response: string;
  created_at: Date;
}

const PromptSchema: Schema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  category_id: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  sub_category_id: { type: Schema.Types.ObjectId, ref: 'SubCategory', required: true },
  prompt: { type: String, required: true },
  response: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

export default mongoose.model<IPrompt>('Prompt', PromptSchema);
