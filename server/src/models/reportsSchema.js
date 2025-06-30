import mongoose from "./../config/connection.js";

const ReportsSchema = new mongoose.Schema({
  reporterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  reportedUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  reason: {
    type: String,
    enum: [
      "spam",
      "harassment",
      "inappropriate_content",
      "fake_profile",
      "violence_threat",
      "other",
    ],
    required: true,
  },
  description: {
    type: String,
    trim: true,
    default: "",
    maxlength: 500,
  },
  status: {
    type: String,
    enum: ["pending", "reviewed", "action_taken", "dismissed"],
    default: "pending",
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

// Auto-update timestamps on save
ReportsSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model("Report", ReportsSchema);
