const { Schema, default: mongoose } = require("mongoose");

const Quote = new Schema(
  {
    bookId: {
      type: Schema.Types.ObjectId,
      ref: "book",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "auth", // sening user modeling nomi "auth" bo‘lsa. Agar boshqacha bo‘lsa aytasan.
      required: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("quote", Quote);