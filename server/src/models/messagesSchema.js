import mongoose from './../config/connection.js';

const Messages = new mongoose.Schema({
   chatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ChatSession",
    required: true,
    index: true, // Critical for fast lookups of messages by chat session
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    trim: true,
    default: "",
  },
  images: {
    type: [String], // Array of image URLs
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
})

export default mongoose.model("Messages", Messages);