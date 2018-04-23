import {getApp} from './api';


const app = getApp().then((app) => {
  app.listen(3000, () => {
    console.log('The app is ready.');
  });
});
