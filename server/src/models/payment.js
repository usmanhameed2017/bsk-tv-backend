const { Schema, model } = require("mongoose");

// Payment Schema
const paymentSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    gateway: { type: String, enum: ["stripe", "paypal"], required: true },
    transactionId: {  type: String, required: true }, // Unique ID from Stripe/PayPal
    amount: { type: Number, required: true },
    currency: { type: String, default: "USD" },
    status: { type: String, enum: ["pending", "succeeded", "failed", "refunded"], default: "pending" },
    method: { type: String }, // e.g: "card", "paypal_balance"
    metadata: { type: Object }, // Additional info if returned
    date: { type: Date, default: Date.now }
}, { timestamps: true });

// Model
const Payment = model("Payment", paymentSchema);

module.exports = Payment;