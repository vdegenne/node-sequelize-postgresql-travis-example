import {Router} from 'express';
import * as control from 'req-control';
import * as Sequelize from 'sequelize';

// models
import _compositionRepo from '../models/composition';
import {Element, default as _elementRepo} from '../models/element';
import _atomRepo from '../models/atom';

const router: Router = Router();

// GET
router.get('/', (req, res) => {
  _compositionRepo.findAll().then(
      (compositions) => { res.json(compositions); });
});

router.get('/:elementName', (req, res) => {
  _elementRepo.find({where: {name: req.params.elementName}})
      .then((element: Element) => {
        if (element) {
          _compositionRepo
              .findAll({include: [_atomRepo], where: {element_id: element.id}})
              .then((compositions) => {
                compositions =
                    compositions.map((c: any) => c.get({plain: true}));
                compositions = compositions.map(
                    ({atom_id, element_id, ...others}) => ({...others}));
                res.json(compositions);
              });
        } else {
          res.status(404).end();
        }
      });
});


export default router;
