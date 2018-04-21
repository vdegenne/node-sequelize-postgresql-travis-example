import * as Sequelize from 'sequelize';
import {getSequelize} from '../start-sequelize';

let elementModel: Sequelize.Model<{}, {}>;

export interface Element {
  element_id: Number, name: string, destroy(): Function
}

export async function getElementModel(): Promise<Sequelize.Model<{}, {}>> {
  if (!elementModel) {
    const connection = await getSequelize();

    elementModel = connection.define('elements', {
      element_id:
          {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
      name: {type: Sequelize.STRING, allowNull: false}
    });
  }

  return elementModel;
}
