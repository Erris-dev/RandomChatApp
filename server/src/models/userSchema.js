import mongoose from "mongoose";

const User = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    isBot: {
        type: Boolean,
        default: false,
    },
    avatar: {
        type: String,
        default: '',
    },
     profession: {
        type: String,
        default: '',
    },
    location: {
        type: String,
        trim: true,
        default: '',
    },
    gender: {
        type: String,
        default: '',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

export default mongoose.model("User", User);