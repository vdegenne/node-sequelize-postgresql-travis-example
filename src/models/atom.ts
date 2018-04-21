import * as Sequelize from 'sequelize';
import {getSequelize} from '../start-sequelize';

let atomModel: Sequelize.Model<{}, {}>;


export interface Atom {
  atom_id: Number, name: string, symbol: CharacterData, atomic_number: Number,
      atomic_mass: Float32Array
}

export async function getAtomModel(): Promise<Sequelize.Model<{}, {}>> {
  if (!atomModel) {
    const connection = await getSequelize();

    atomModel = connection.define('atoms', {
      atom_id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
      name: {type: Sequelize.TEXT, allowNull: false},
      symbol: {type: Sequelize.STRING(1), allowNull: false},
      atomic_number: {type: Sequelize.INTEGER, allowNull: false},
      atomic_mass: {type: Sequelize.NUMERIC, allowNull: false}
    });
  }

  return atomModel;
}
