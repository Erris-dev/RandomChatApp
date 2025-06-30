import mongoose from "./../config/connection.js";

const UserDetails = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    bio: {
        type: String,
        trim: true,
        default: '',
    },
    location: {
        type: String,
        trim: true,
        default: '',
    },
    gender: {
        type: String,
        enum: ["male", "female", "non-binary", "prefer_not_to_say"], // Forward-looking inclusion & diversity-aware
        default: "prefer_not_to_say",
    } 
})

export default mongoose.model("UserDetails", UserDetails);
