import mongoose from "mongoose";

const SavedImage = new mongoose.Schema({
    sessionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ChatSession",
        required: true,
        index: true,
    },
    images: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("SavedImage", SavedImage);