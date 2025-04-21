import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema(
  {
    shortUrl: {
      type: String,
      required: true,
      ref: "Url",
    },
    clicks: [
      {
        timestamp: {
          type: Date,
          default: Date.now,
        },
        ip: String,
        userAgent: String,
        referrer: String,
        country: String,
        city: String,
        device: String,
        browser: String,
      },
    ],
  },
  { timestamps: true }
);

const Analytics = mongoose.model("Analytics", analyticsSchema);

export default Analytics;
