import * as Sequelize from 'sequelize';

// in a private deployement, the real authentication information goes right
// here.
const dbConfig = {
  database: 'realdatabase',
  username: 'realusername',
  password: 'realpassword'
};

if (process.env.NODE_ENV && process.env.NODE_ENV === 'test') {
  dbConfig.database = 'testdb';
  dbConfig.username = 'testdbuser';
  dbConfig.password = 'password';
}


let sequelize: Sequelize.Sequelize;

export async function getSequelize(): Promise<Sequelize.Sequelize> {
  if (!sequelize) {
    sequelize = new Sequelize(Object.assign(dbConfig, {
      dialect: 'postgresql',
      logging: false,
      operatorsAliases: false,
      define: {timestamps: false}
    }));
  }

  return sequelize;
}
