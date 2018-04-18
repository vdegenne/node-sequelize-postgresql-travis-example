import * as express from 'express';

export function getApp() {
  const app: express.Express = express();

  app.get('/api/v1/users', (req, res) => {
    (req);

  });

  return app;
}
