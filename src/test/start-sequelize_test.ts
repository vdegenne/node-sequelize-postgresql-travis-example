import * as chai from 'chai';
import {getSequelize} from '../start-sequelize';

const assert = chai.assert;

describe('Sequelize', () => {
  it('gives us a decent connection', (done) => {
    getSequelize()
        .then((dbcon) => {
          dbcon.authenticate()
              .then(() => {
                dbcon.close();
                done();
              })
              .catch((err) => done(err));
        })
        .catch((err) => done(err));

  });
});
