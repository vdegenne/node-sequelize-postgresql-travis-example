import * as chai from 'chai';
import * as fs from 'fs';
import * as Sequelize from 'sequelize';
import {Model} from 'sequelize';

import {Atom, getAtomModel} from '../models/atom';
import {Composition, getCompositionModel} from '../models/composition';
import {Element, getElementModel} from '../models/element';
import {getSequelize} from '../start-sequelize';

const assert = chai.assert;
const expect = chai.expect;

suite('Sequelize', () => {
  let _dbcon: Sequelize.Sequelize;
  let _atoms: Sequelize.Model<{}, {}>;
  let _elements: Sequelize.Model<{}, {}>;
  let _compositions: Sequelize.Model<{}, {}>;

  before(async() => {
    try {
      _dbcon = await getSequelize();
      // order matters ?
      _atoms = await getAtomModel();
      _elements = await getElementModel();
      _compositions = await getCompositionModel();

      await _dbcon.sync(
          {force: true});  // we force and destroy the database before each test
    } catch (err) {
      throw err;
    }
    // we should reset the data here
    // we get the file with the data queries
    const queries = fs.readFileSync(__dirname + '/../../sql/data.sql');
    await _dbcon.query(queries.toString());

  });


  after(() => {
    if (_dbcon) {
      // console.log('closing the connection');
      _dbcon.close();
    }
  });

  const getElementsTableLength: () => Promise<number> = async() => {
    const elements = await _elements.findAll();
    return elements.length;
  };


  test('gives us a decent connection', (done) => {
    getSequelize()
        .then((dbcon) => {
          dbcon.authenticate()
              .then(() => {
                done();
              })
              .catch((err) => done(err));
        })
        .catch((err) => done(err));

  });

  test('contains 1 initial element', async() => {
    // water
    expect(await getElementsTableLength()).to.be.equal(1);
  });

  test('contains 2 elements after addition', async() => {
    // add the element
    await _elements.create({name: 'carbon dioxide'});
    // test
    expect(await getElementsTableLength()).to.be.equal(2);
  });

  test('contains 1 element back after deletion', async() => {
    // take the previously inserted welement
    const element: Element =
        <Element>(await _elements.find({where: {name: 'carbon dioxide'}}));
    // be sure we take the previous element
    expect(element.name).to.be.equal('carbon dioxide');
    // we destroy the element
    await element.destroy();
    expect(await getElementsTableLength()).to.equal(1);
  });


  test('creates a null value results in a throw error', (done) => {

    _elements.create({name: null})
        .then((user) => {
          done(new Error('this shouldn\'t work'));
        })
        .catch((err) => {
          // it is all expected
          done();
        });
  });

  test('composition gives an Atom Element directly', async() => {
    // get the element 'water'
    const element: Element =
        <Element>(await _elements.find({where: {name: 'water'}}));
    // get the composition now
    const compositions: Composition[] =
        <Composition[]>(await _compositions.findAll(
            {where: {element_id: element.element_id}, include: [_atoms]}));

    let comp: Composition;
    /*     for (comp of compositions) {
          const atom: Atom = comp.get('atom');
          console.log(`${atom.symbol} (${comp.get('count')})`);
        } */

  });

  test('it saves included instances', async() => {
    /* Get "water" composition */
    const compositions: any[] = await _compositions.findAll(
        {include: [{model: _elements, where: {name: 'water'}}, _atoms]});

    /**
     * compositions[0] -> Hydrogren
     * compositions[1] -> Oxygen
     */
    let hydrogen = compositions[0].atom;
    /* rename "Hydrogen" to "My super Hydrogen" */
    hydrogen.name = 'My super Hydrogen';

    /* save the composition */
    compositions[0].save();

    /* Get a fresh Hydrogen Instance from the database */
    hydrogen = await _atoms.find({where: {symbol: 'H'}});
    expect(hydrogen.name).to.equal('Hydrogen');
    /*     expect(hydrogen.name)
            .to.equal('My super Hydrogen', 'wrong, the value is still
       Hydrogen'); */
  });
});
