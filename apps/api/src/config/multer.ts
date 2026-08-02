import multer from "multer";
import fs from "fs";
import path from "path";

import {
  MAX_FILE_SIZE,
  ALLOWED_FILE_TYPES,
} from "../common/constants/file.constants.js";

const uploadPath = path.join(
  process.cwd(),
  "uploads"
);

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, {
    recursive: true,
  });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadPath);
  },

  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);

    cb(
      null,
      `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2)}${ext}`
    );
  },
});

export const upload = multer({
  storage,

  limits: {
    fileSize: MAX_FILE_SIZE,
  },

  fileFilter: (_req, file, cb) => {
    if (
      ALLOWED_FILE_TYPES.includes(
        file.mimetype
      )
    ) {
      cb(null, true);
      return;
    }

    cb(
      new Error(
        "Unsupported file type."
      )
    );
  },
});