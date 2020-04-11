'use strict';
const factoryGirl = require('factory-girl');
const adapter = new factoryGirl.SequelizeAdapter();
const factory = factoryGirl.factory;

factory.setAdapter(adapter);

let Models = require('../models');



// clean the factory state - necessary for mocha watch

factory.cleanUp();
factory.factories = [];

// define factories
require('./factories')(factory, Models);

/* uncomment to see UnhandledPromiseRejectionWarning stack traces */
/*
process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p);
  console.log('reason:', reason);
});
*/

// Set up chai
const chai =require('chai')
const expect = chai.expect
const sinonChai = require('sinon-chai')
const chaiSubset = require('chai-subset')

chai.use(sinonChai)
chai.use(chaiSubset)


beforeEach(done => {
  Models.sequelize.sync({ force: true }).then(() => {
    done();
  });
});

module.exports = {
  factory,
  Models,
  expect
}