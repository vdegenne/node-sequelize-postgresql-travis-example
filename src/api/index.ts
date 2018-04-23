import * as express from 'express';
import atomRouter from './atom-router';
import elementRouter from './element-router';
import compositionRouter from './composition-router';


export async function getApp(): Promise<express.Express> {
  const app: express.Express = express();

  app.use(express.urlencoded({extended: true}));
  app.use('/api/atoms', atomRouter);
  app.use('/api/elements', elementRouter);
  app.use('/api/compositions', compositionRouter);

  return app;
}
