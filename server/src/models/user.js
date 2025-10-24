const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

// Schema
const userSchema = new Schema({
    // Basic Account Info
    name: { type: String, required: [true, "Name is required"], trim: true },
    email: { type: String, required: true, unique: [true, "Tihs email is already taken"], lowercase: true },
    password: { type: String, required: true, minlength: [6, "Password must be at least 8 characters long"] },

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

// Hash password
userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();
    try 
    {
        this.password = await bcrypt.hash(this.password, 10);
        return next();
    } 
    catch(error) 
    {
        console.log("Failed to hash password before saving", error.message);
        return next();
    }
});

// Match password
userSchema.methods.matchPassword = async function(password) {
    if(!password) return false;
    try 
    {
       return await bcrypt.compare(password, this.password); 
    } 
    catch (error) 
    {
        console.log("Failed to compare passwords", error.message);
        return false;
    }
}

// Get user by email
userSchema.static("getUser", async function(email) {
    try 
    {
        const user = await this.findOne({ email });
        if(!user) return null;
        return user;
    } 
    catch(error) 
    {
        console.log(error.message);
        return null;
    }
});

// Model
const User = model("User", userSchema);

module.exports = User;