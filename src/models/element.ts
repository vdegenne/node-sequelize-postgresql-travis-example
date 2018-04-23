import * as Sequelize from 'sequelize';
import database from '../database';



const _elements = database.define('elements', {
  id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: Sequelize.STRING, allowNull: false}
});


export interface Element {
  id: Number;
  name: string;

  destroy(): Promise<number>;
}

export default _elements;
