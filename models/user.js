const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// .test@, match
const userSchema = new Schema(
  {
    fullName: { type: String, required: [true, "FullName is Required"] },
    email: {
      type: String,
      required: [true, "Email is Required"],
      unique: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    phoneNumber: { type: String, unique: true, match: /^\+?[1-9][0-9]{7,14}$/ },
    profilePicture: {
      type: String,
      default:
        "data:image/jpeg;base64,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",
    },
    //enum- means you are providing options for the user to pick from
    role: { type: String, enum: ["tenant", "landlord"], default: "tenant" },
    password: {
      type: String,
      minLength: [6, "Minimum password length is 6"],
      required: [true, "Password is requiredwwwwwwwww "],
    },
    isVerified: { type: Boolean, default: false },
    verificationToken: String,
    verificationTokenExpires: Date,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

const USER = mongoose.model("user", userSchema);
module.exports = USER;
