const { Schema, model } = require("mongoose");

// Schema
const userSchema = new Schema({
    // Basic Account Info
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },

    // Profile & Avatar
    avatar: {
      url: { type: String, default: "https://via.placeholder.com/150" },
      fileId: { type: String }
    },

    // Subscription / Plan
    subscription: {
        plan: { type: String, enum: ["Free", "Standard", "Premium"], default: "Free" },
        startDate: { type: Date },
        endDate: { type: Date },
        isActive: { type: Boolean, default: false }
    },

    // Watchlist / Favorites
    watchlist: [{
        videoId: { type: Schema.Types.ObjectId, ref: "Video" },
        addedAt: { type: Date, default: Date.now }
    }],

    // Watch History
    watchHistory: [{
        videoId: { type: Schema.Types.ObjectId, ref: "Video" },
        lastWatchedAt: { type: Date, default: Date.now }
    }],

    // Preferences / Recommendations
    preferences: {
      genres: [{ type: String }],
      languages: [{ type: String }],
    },

    // Device & Login
    lastLogin: { type: Date },
    devices: [{
        deviceId: { type: String },
        userAgent: { type: String },
        ip: { type: String },
        loginAt: { type: Date, default: Date.now },
    }],

    // Roles
    role: { type: String, enum: ["user", "admin"], default: "user" },

    // System Fields
    isVerified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

// Model
const User = model("User", userSchema);

module.exports = User;