import express from 'express';
import {uploadFile} from '../services/s3';
import { setImageController } from '../controller/setImageController';
export const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })

router.post('/setMovie', upload.single('file'), async (req:any, res:any) => {
    const { result, error } = await uploadFile(req.file);
    if (error) res.send(error).status(500);

    result.name = `${req.body.name}`;
    const { error: controlError, value } = await setImageController(result);
    if (controlError) res.send(controlError).status(500);
    
    res.send(value).status(201);
})

module.exports = { router }