import express from 'express';
import config from './src/configurations/config';
import { router } from './src/routers/router';

require('./src/database/database');

const app = express();

app.use(express.json());

app.use('/', router);

app.listen(config.PORT, () => {
  console.log(`App listen port: ${config.PORT}`);
});
