import express from 'express';
import multer from 'multer';

const router = express.Router();

const uploading = multer({
  dest: './uploads/',
  limits: {files:1},
  fieldSize: 1000000,
  inMemory: true
});

router.post('/upload', uploading.single('image'), (req, res) => {
	res.json(req.file);
  	res.end();
});

export default router
