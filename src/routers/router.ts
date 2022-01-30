import express, { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { uploadFile, getFileStream } from '../services/s3';
import { setImageController, getKeyByIdController, setImageLocalController } from '../controller/setImageController';
import { Adapter } from '../Adapter/adapter';
import { Local, S3 } from '../Class/Class';

export const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/setImageS3', upload.single('file'), async (req: Request, res: Response) => {
  console.log(req.file);
  const { result, error } = await uploadFile(req.file);

  if (error) res.send(error).status(500);

  const { error: controlError, value } = await setImageController(result, req.body.name);

  if (controlError) res.send(controlError).status(500);

  res.status(value.status).send(value.data);
});

router.post('/setImageLocal', upload.single('file'), async (req: Request, res: Response) => {
  console.log(req.file);
  const { result, error } = await setImageLocalController(req.file, req.body.name);

  if (error) {
    res.status(error.status).send(error.data);
  }

  res.status(result.status).send(result.data);
});

router.get('/getImage/:id', async (req: any, res: any) => {
  const id = req.params;
  const { error: controlError, value } = await getKeyByIdController(id);
  let saveType;
  console.log(value.data);
  switch (value.data.save_type) {
    case 'local': {
      saveType = new Local(value.data.key);

      break;
    }

    case 's3': {
      saveType = new S3(value.data);

      break;
    }

    default: {
      res.send('Error');
    }
  }

  const getFileClass = new Adapter(saveType);

  const test = getFileClass.getTargetFile();
  res.status(200);
  test.pipe(res);
});

module.exports = { router };
