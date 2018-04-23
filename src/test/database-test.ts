import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as fs from 'fs';
import * as Sequelize from 'sequelize';
import {Model} from 'sequelize';

import {Atom, default as _atomrepo} from '../models/atom';
import {Composition, default as _compositionrepo} from '../models/composition';
import {Element, default as _elementrepo} from '../models/element';

import database from '../database';

chai.use(chaiAsPromised);
const assert = chai.assert;
const expect = chai.expect;

suite('Sequelize', () => {

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


  after(() => database.close());

  test('gives us a decent connection', (done) => {
    database.authenticate().then(() => done()).catch((err) => done(err));
  });

  test('contains 1 initial element', (done) => {
    // water
    _elementrepo.count()
        .then((count) => {
          expect(count).to.be.equal(1);
          done();
        })
        .catch((err) => done(err));
  });

  test('contains 2 elements after addition', (done) => {
    // add the element
    _elementrepo.create({name: 'carbon dioxide'}).then((element) => {
      _elementrepo.count()
          .then((count) => {
            expect(count).to.be.equal(2);
            done();
          })
          .catch(err => done(err));
    });
  });


  test('contains 1 element back after deletion', async() => {
    // take the previously inserted welement
    const element: Element =
        <Element>await _elementrepo.find({where: {name: 'carbon dioxide'}});
    // be sure we take the previous element
    expect(element.name).to.be.equal('carbon dioxide');
    // we destroy the element
    await element.destroy();
    expect(await _elementrepo.count()).to.be.equal(1);
  });



  test('creates a null value results in a throw error', (done) => {
    _elementrepo.create({name: null})
        .then(() => done(new Error('this shouldn\'t happen')))
        .catch(err => done());
  });


  test('composition contains an atom', async() => {
    // get the element 'water'
    const element: Element =
        <Element>(await _elementrepo.find({where: {name: 'water'}}));
    // get the composition now
    const compositions: Composition[] =
        <Composition[]>(await _compositionrepo.findAll(
            {where: {element_id: element.id}, include: [_atomrepo]}));

    // get the first composition
    let comp: Composition = compositions[0];
    expect(comp.atom.symbol).to.be.equal('H');
  });

});
