import mongoose from "mongoose";

const notesSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },

    bookId: {
      type: mongoose.Types.ObjectId,
      ref: "Book",
      default: null,
    },

    content: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

notesSchema.index({userId: 1});
notesSchema.index({bookId: 1});

const notesModel = mongoose.model("note", notesSchema);

export default notesModel;
