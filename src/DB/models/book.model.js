import mongoose from "mongoose";
import {BookEnum} from "../../common/utils/enum/book.enum.js";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 200,
      trim: true,
    },
    description: {
      type: String,
      minLength: 1,
      trim: true,
    },
    totalPages: {
      type: String,
      minLength: 1,
      trim: true,
      required: true,
    },
    category: {
      type: String,
      enum: Object.values(BookEnum),
      default: BookEnum.other,
    },
    image: String,
    pdf: String,
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
    strictQuery: true,
  },
);

const bookModel = mongoose.models.book || mongoose.model("book", bookSchema);

export default bookModel;
