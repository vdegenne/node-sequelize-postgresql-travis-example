import * as Sequelize from 'sequelize';
import {getSequelize} from '../start-sequelize';
import {getAtomModel} from './atom';
import {getElementModel} from './element';

export interface Composition {
  composition_id: Number;
  element_id: Number;
  atom_id: Number;
  count: Number
}

let model: Sequelize.Model<any, any>;

export async function getCompositionModel(): Promise<Sequelize.Model<{}, {}>> {
  if (!model) {
    const connection = await getSequelize();

    model = connection.define('compositions', {
      composition_id:
          {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
      count: {type: Sequelize.INTEGER, allowNull: false}
    });

    model.belongsTo(await getElementModel(), {foreignKey: 'element_id'});
    model.belongsTo(await getAtomModel(), {foreignKey: 'atom_id'});
  }


  return model;
}
