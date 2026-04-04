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

    title: {
      type: String,
      trim: true,
      required: true,
    },

    content: {
      type: String,
      trim: true,
      required: true,
    },

    page: {
      type: Number,
      default: null,
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
