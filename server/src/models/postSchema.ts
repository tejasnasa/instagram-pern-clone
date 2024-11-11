import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  imageUrl: String,
  caption: String,
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default PostSchema;
