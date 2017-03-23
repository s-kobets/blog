import express from 'express';
import multer from 'multer';

const router = express.Router();
// const fs = require('fs-extra');

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     let path = './uploads/';
//     fs.mkdirsSync(path);
//     cb(null, path);
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname)
//   }
// });

const uploading = multer({
  dest: './uploads/',
  limits: {files:1},
  fieldSize: 1000000,
  inMemory: true
  // ,
  // storage: storage
});

//single('image')
router.post('/upload', uploading.single('image'), (req, res) => {
	res.json(req.file);
	// console.log('uploads', req.file);
  	res.end();
});

export default router;