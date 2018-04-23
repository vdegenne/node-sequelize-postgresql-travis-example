import {Router} from 'express';
import * as control from 'req-control';
import * as Sequelize from 'sequelize';

import _elementRepo from '../models/element';



const router: Router = Router();

// GET
router.get('/', (req, res) => {
  _elementRepo.findAll().then((elements) => { res.json(elements); });
});


// POST
router.post('/', (req, res) => {
  if (control.post(req, res, 'name')) {
    _elementRepo.create({name: req.body.name})
        .then((element) => res.json(element));
  }
});


export default router;
