// import app from './app';

// const port = 3300;

// app.listen(port, () => console.log(`Server listening on port ${port}!`));

import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { InversifyExpressServer } from 'inversify-express-utils';

import setupContainer from './infra/ioc/inversifyConfig';
import './web/controllers/personController';

(async () => {
  const container = await setupContainer();
  const app = new InversifyExpressServer(container, null, {
    rootPath: '/api',
  });

  app.setConfig(app => {
    app.use(cors());
    app.use(express.json());
  });

  const server = app.build();

  const port = 3300;
  server.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}/`);
  });
})();
