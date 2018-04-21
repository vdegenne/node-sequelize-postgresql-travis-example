import * as express from 'express';
import * as Sequelize from 'sequelize';
import {getAtomModel} from '../models/atom';
import {verifyPOST} from './app';

const router: express.Router = express.Router();
let _atoms: Sequelize.Model<{}, {}>;
(async() => {
  _atoms = await getAtomModel();
})();

/* GET */
router.get('/', async(req, res) => {
  res.json(await _atoms.findAll());
});

/* POST */
router.post('/', async(req, res) => {
  /* res.body._atoms.create() */
  if (!verifyPOST(req, res, 'name', 'symbol', 'atomic_number', 'atomic_mass')) {
  }
  _atoms.create(req.body).then((atom) => {
    res.json(atom);
  });
});

export default router;
