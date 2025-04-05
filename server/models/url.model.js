import mongoose, { Schema, model } from "mongoose";

const urlSchema = new Schema(
  {
    originalUrl: {
      type: String,
      required: true,
      trim: true,
    },
    shortCode: {
      type: String,
      unique: true,
      trim: true,
      max: 6,
    },
    shortUrl: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    clicks: [
      {
        timestamp: { type: Date, default: Date.now },
        referrer: String,
        userAgent: String,
      },
    ],
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

urlSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 30 }); // TTL 30 days

const Url = model("Url", urlSchema);
export default Url;
