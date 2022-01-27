import express from 'express';
import {uploadFile} from '../services/s3';
import { setImageController } from '../controller/setImageController';
export const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })

router.post('/setMovie', upload.single('file'), async (req:any, res:any) => {
    const result = await uploadFile(req.file);
    result.name = `${req.body.name}`;
    
    const { error: error, value } = await setImageController(result);

    if (error) res.send(error).status(500);
    res.send(value).status(201);
})

module.exports = { router }
