const { Schema, model } = require("mongoose");

// Subscription Schema
const subscriptionSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    gateway: { type: String, enum: ["stripe", "paypal"], required: true },
    subscriptionId: { type: String, required: true }, // Unique subscription ID from gateway
    plan: { type: String, enum: ["Free", "Standard", "Premium"], default: "Free" },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
    status: { type: String, enum: ["active", "canceled", "expired"], default: "active" }
}, { timestamps: true });

// Model
const Subscription = model("Subscription", subscriptionSchema);

module.exports = Subscription;