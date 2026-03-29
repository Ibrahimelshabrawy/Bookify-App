import fs from "fs";
import path from "path";
import multer from "multer";

export const multer_local = ({
  custom_path = "General",
  custom_types = [],
} = {}) => {
  const fullPath = `uploads/${custom_path}`;
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      let folder = fullPath;
      if (file.fieldname === "image") {
        folder = `uploads/images`;
      }
      if (file.fieldname === "pdf") {
        folder = `uploads/pdfs`;
      }
      if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, {recursive: true});
      }
      cb(null, folder);
    },

    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + "-" + file.originalname.replaceAll(" ", "-"));
    },
  });

  function fileFilter(req, file, cb) {
    if (!custom_types.includes(file.mimetype)) {
      return cb(new Error("Invalid File Type", {cause: 400}));
    }
    return cb(null, true);
  }

  return multer({storage, fileFilter});
};

export const multer_host = (custom_types = []) => {
  const storage = multer.diskStorage({
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + "-" + file.originalname);
    },
  });
  function fileFilter(req, file, cb) {
    if (!custom_types.includes(file.mimetype)) {
      return cb(new Error("inValid File Type", {cause: 400}));
    }
    return cb(null, true);
  }

  const upload = multer({storage, fileFilter});
  return upload;
};

export const normalizePath = (filePath) => {
  return filePath.replace(/\\/g, "/");
};
