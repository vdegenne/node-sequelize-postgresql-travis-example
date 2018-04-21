import {getApp} from './api/app';


const app = getApp().then((app) => {
  app.listen(3000, () => {
    console.log('The app is ready.');
  });
});
