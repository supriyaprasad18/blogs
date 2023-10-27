import mongoose, { Schema } from "mongoose";
import { category } from "../constant";

const BlogPostSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  category_id: { type: String, required: true, enum: Object.keys(category) },
});

const BlogPost = mongoose.model("BlogPost", BlogPostSchema);

export default BlogPost;
