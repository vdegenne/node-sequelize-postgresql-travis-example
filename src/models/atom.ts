import * as Sequelize from 'sequelize';
import database from '../database';


const _atoms = database.define('atoms', {
  atom_id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: Sequelize.TEXT, allowNull: false},
  symbol: {type: Sequelize.STRING(1), allowNull: false},
  atomic_number: {type: Sequelize.INTEGER, allowNull: false},
  atomic_mass: {type: Sequelize.NUMERIC, allowNull: false}
});

export interface Atom {
  atom_id: number;
  name: string;
  symbol: string;
  atomic_number: number;
  atomic_mass: number;

  update(values: any): Promise<Atom>;
}

export default _atoms;
