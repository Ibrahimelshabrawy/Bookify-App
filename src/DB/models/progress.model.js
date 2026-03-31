import mongoose from "mongoose";
import {ProgressStatusEnum} from "../../common/utils/enum/progress.enum.js";

const progressSchema = new mongoose.Schema(
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
    currentPage: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: Object.values(ProgressStatusEnum),
      default: ProgressStatusEnum.reading,
    },
  },
  {
    timestamps: true,
  },
);

progressSchema.index({userId: 1, bookId: 1}, {unique: true});

const progressModel =
  mongoose.models.progress || mongoose.model("progress", progressSchema);

export default progressModel;
