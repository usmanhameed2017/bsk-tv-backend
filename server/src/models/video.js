const { Schema, model } = require("mongoose");

// Schema
const videoSchema = new Schema({
    // Basic Info
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    releaseDate: { type: Date },
    duration: { type: Number, required: true }, // in seconds

    // File Info
    video: {
        url: { type: String, required: true },
        fileId: { type: String },
        thumbnailUrl: { type: String },
    },

    // Classification
    category: { 
        type: String, 
        enum: ["Movie", "TV Show", "Documentary", "Short Film"], 
        default: "Movie" 
    },
    genres: [{ 
            type: String, 
            enum: [
                "Action", "Comedy", "Drama", "Romance", "Thriller", "Crime", 
                "Horror", "Sci-Fi", "Animation", "Adventure", "Fantasy", "Mystery"
            ] 
    }],
    language: { type: String, default: "English" },
    ageRating: { type: String, enum: ["G", "PG", "PG-13", "R", "18+"], default: "PG" },

    // Credits
    cast: [{ type: String }],
    director: { type: String },
    writers: [{ type: String }],

    // Engagements
    views: { type: Number, default: 0 },
    likesCount: { type: Number, default: 0 },
    dislikesCount: { type: Number, default: 0 },
    comments: [{ type: Schema.Types.ObjectId, ref: "User" }],
    commentsCount: { type: Number, default: 0 },

    // Flags
    isPublished: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },

    // Metadata
    uploadedBy: { type: Schema.Types.ObjectId, ref: "User" },
    uploadedAt: { type: Date, default: Date.now },
}, { timestamps: true });

// Model
const Video = model("Video", videoSchema);

module.exports = Video;