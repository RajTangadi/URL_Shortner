import mongoose from "mongoose";

const clickSchema = new mongoose.Schema({
  referrer: String,
  userAgent: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const urlSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: true,
    },
    shortCode: {
      type: String,
      required: true,
      unique: true,
    },
    shortUrl: {  
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    clicks: [clickSchema],
    expired: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // This will allow TTL (time-to-live) for auto-deletion (optional)
      expires: "30d", // Document will be removed automatically by MongoDB after 30 days
    },
  },
  { timestamps: true }
);

// Pre-query middleware: Mark expired URLs based on TTL date
urlSchema.pre("find", function () {
  this.where({ expired: false });
});

export default mongoose.model("Url", urlSchema);

// import mongoose, { Schema, model } from "mongoose";

// const urlSchema = new Schema(
//   {
//     originalUrl: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     shortCode: {
//       type: String,
//       unique: true,
//       trim: true,
//       max: 6,
//     },
//     shortUrl: {
//       type: String,
//       required: true,
//     },
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//     clicks: [
//       {
//         timestamp: { type: Date, default: Date.now },
//         referrer: String,
//         userAgent: String,
//       },
//     ],
//     createdAt: { type: Date, default: Date.now },
//   },
//   { timestamps: true }
// );

// urlSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 30 }); // TTL 30 days

// const Url = model("Url", urlSchema);
// export default Url;
