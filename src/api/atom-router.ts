import {Router} from 'express';
import * as control from 'req-control';
import * as Sequelize from 'sequelize';

// models
import _atomRepo from '../models/atom';
// import _elementRepo from '../models/element';


const router: Router = Router();

// GET
router.get('/', (req, res) => {
  _atomRepo.findAll().then((compositions) => {
    res.json(compositions);
  });
});


export default router;
