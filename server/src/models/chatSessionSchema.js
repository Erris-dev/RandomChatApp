import mongoose from "mongoose"

const ChatSession = new mongoose.Schema({
  userA: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userB: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  chatKey: { type: String, unique: true, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});


export default mongoose.model("ChatSession", ChatSession);
