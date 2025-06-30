import mongoose from "./../config/connection.js";

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
  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",
  },
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

// Ensure uniqueness of chat between two users (order-agnostic)
ChatSession.index(
  { userA: 1, userB: 1 },
  { unique: true }
);


export default mongoose.model("ChatSession", ChatSession);
