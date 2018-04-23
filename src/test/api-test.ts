import * as chai from 'chai';
import * as fs from 'fs';
import * as supertest from 'supertest';

import {getApp} from '../api';

import database from '../database';

const expect = chai.expect;

suite('api', () => {

  suiteSetup((done) => {
    try {
      // just flushing the data before every test
      database.sync({force: true}).then(() => {
        const queries = fs.readFileSync(__dirname + '/../../sql/data.sql');
        database.query(queries.toString()).then(() => done());
      });
    } catch (err) {
      done(err);
    }
  });

  test('returns all the initial atoms', async() => {
    const app = await getApp();

    await supertest(app)
        .get('/api/atoms')
        .expect(200, /Hydrogen/)
        .expect('content-type', /^application\/json/);
  });

  test('add an element and returns it\'s id', async() => {
    const app = await getApp();

    await supertest(app)
        .post('/api/elements')
        .send('name=carbon dioxide')
        .expect(200)
        .expect((res: any) => {
          const element = JSON.parse(res.text);
          expect(element.id).to.equal(2);
        });
  });
});
