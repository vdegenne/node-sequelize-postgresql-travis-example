import * as express from 'express';
import atomRouter from './atom';


export async function getApp(): Promise<express.Express> {
  const app: express.Express = express();

  app.use(express.urlencoded({extended: true}));
  app.use('/api/atoms', atomRouter);

  return app;
}


export function verifyPOST(
    req: express.Request, res: express.Response, ...params: any[]): boolean {
  if (!req.body) {
    throw new Error('the request body is empty');
  }
  let param;
  for (param of params) {
    if (!(param in req.body)) {
      return false;
    }
  }
  return true;
}
