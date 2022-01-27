import express from 'express';
import multer from 'multer';
import { uploadFile, getFileStream } from '../services/s3';
import { setImageController, getKeyByIdController } from '../controller/setImageController';

export const router = express.Router();
const upload = multer();

router.post('/setMovie', upload.single('file'), async (req: any, res: any) => {
  console.log(req.file);
  const { result, error } = await uploadFile(req.file);

  if (error) res.send(error).status(500);

  const { error: controlError, value } = await setImageController(result, req.body.name);

  if (controlError) res.send(controlError).status(500);

  res.status(value.status).send(value.data);
});

router.get('/getMovie/:id', async (req: any, res: any) => {
  const id = req.params;
  const { error: controlError, value } = await getKeyByIdController(id);

  const readStream = getFileStream(value.data);

  res.status(200);
  readStream.pipe(res);
});

module.exports = { router };
