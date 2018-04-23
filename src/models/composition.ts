import * as Sequelize from 'sequelize';
import database from '../database';
import {Element, default as _elementRepo} from './element';
import {Atom, default as _atomRepo} from './atom';

const _compositions = database.define('compositions', {
  composition_id:
      {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  count: {type: Sequelize.INTEGER, allowNull: false}
});

_compositions.belongsTo(_elementRepo, {foreignKey: 'element_id'});
_compositions.belongsTo(_atomRepo, {foreignKey: 'atom_id'});

export interface Composition {
  composition_id: Number;
  count: Number;
  element: Element;
  atom: Atom;

  save(): Promise<Composition>;
  update(values: any): Promise<Composition>
}


export default _compositions;
