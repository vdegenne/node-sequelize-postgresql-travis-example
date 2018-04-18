import * as chai from 'chai';
import {getSequelize} from '../start-sequelize';

const assert = chai.assert;

describe('Sequelize', () => {
  it('should give an Object', async() => {
    await getSequelize();
  });
});
