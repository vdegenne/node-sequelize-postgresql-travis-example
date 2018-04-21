import * as chai from 'chai';
import * as supertest from 'supertest';
import {getApp} from '../api/app';


const expect = chai.expect;

suite('api', () => {
  test('returns all the initial atoms', async() => {
    const app = await getApp();

    await supertest(app)
        .get('/api/atoms')
        .expect(200, /Hydrogen/)
        .expect('content-type', /^application\/json/);
  });

  test('add an atom and returns it\'s id', async() => {
    const app = await getApp();

    await supertest(app).post('/api/atoms').send('hello=lol').expect(200);
  });
});
