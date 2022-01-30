import dotenv from 'dotenv';
import sendGrid from '@sendgrid/mail';

import {promises as fsPromises} from "fs";

dotenv.config();

const { API_KEY } = process.env;

sendGrid.setApiKey(API_KEY);

export const sendMessage = async (url: string) => {
  await sendGrid.send({
    to: 's12122000@gmail.com',
    from: 'miha1488plet@gmail.com',
    subject: 'Testing sandGrid',
    text: 'Viatcheslav sand this mail!',
    html: `<h1>You Image was sucsesfull upload. Url = ${url}</h1>`,
  });
};
