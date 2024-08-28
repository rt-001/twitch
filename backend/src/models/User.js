import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, unique: true },
  username: { type: String },
  password: { type: String },
  channel: { type: Schema.Types.ObjectId, ref: "Channel" },
  // channel will be created at the time of register
  followedChannels: {
    type: [{ type: Schema.Types.ObjectId, ref: "Channel" }],
    default: [],
  },
  // followedChannels should be empty array by default
});

export default mongoose.model("User", userSchema);
