import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  userId: {
    type: Mongoose.ObjectId,
    required: true,
  },
  category: {
    //DROPDOWN MENU
    type: String,
    required: true,
    enum: ["Home repairs", "Shopping", "Child sitting", "Pet sitting"],
  },
  title: {
    type: String,
    required: true,
    maxLength: 50,
    minLength: 8,
  },
  description: {
    type: String,
    required: true,
    maxLength: 250,
    minLength: 20,
  },
  payrate: {
    type: Number,
    required: true,
    min: 0,
  },
  startdate: {
    type: Date,
    required: true,
  },
  enddate: {
    type: Date,
    required: true,
  },
});

const Post = mongoose.model("Post", postSchema);

export default Post;
