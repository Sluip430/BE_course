import express from 'express';
import config from './src/configurations/config';
import { router } from './src/routers/router';
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger/swagger.json";
import cors from 'cors';

const app = express();
app.use(cors());
app.options('*', cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());

app.use('/', router);

app.listen(config.PORT, () => {
  console.log(`App listen port: ${config.PORT}`);
});
