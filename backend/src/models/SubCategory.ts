import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ISubCategory extends Document {
  name: string;
  category_id: Types.ObjectId;
}

const SubCategorySchema: Schema = new Schema({
  name: { type: String, required: true },
  category_id: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
});

export default mongoose.model<ISubCategory>('SubCategory', SubCategorySchema);
