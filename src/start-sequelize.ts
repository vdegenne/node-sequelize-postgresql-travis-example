import * as Sequelize from 'sequelize';

// In a private deployment, the real authentication information goes right
// here.
const dbConfig = {
  host: 'localhost',
  port: 5432,
  database: 'realdatabase',
  username: 'realusername',
  password: 'realpassword'
};

if (process.env.NODE_ENV && process.env.NODE_ENV === 'test') {
  dbConfig.database = 'universe';
  dbConfig.username = 'testdbuser';
  dbConfig.password = 'password';
}


let sequelize: Sequelize.Sequelize;

// This gives us a singleton object representing our connection with our
// database
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
