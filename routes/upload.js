import express from 'express';
import multer from 'multer';

const router = express.Router();
const fs = require('fs-extra');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let path = '../public/uploads/';
    fs.mkdirsSync(path);
    cb(null, path);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname)
  }
});

const uploading = multer({
  dest: __dirname + '/../public/uploads/',
  limits: {files:1},
  storage: storage
});

router.post('/upload',uploading.single('image'), (req, res) => {
  	res.status(200).send();
});

export default router;