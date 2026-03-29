import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    bookId: {
      type: mongoose.Types.ObjectId,
      ref: "book",
      required: true,
    },
  },
  {
    timestamps: true,
    strictQuery: true,
  },
);

favoriteSchema.index({userId: 1, bookId: 1}, {unique: true});

const favoriteModel =
  mongoose.models.favorite || mongoose.model("favorite", favoriteSchema);

export default favoriteModel;
