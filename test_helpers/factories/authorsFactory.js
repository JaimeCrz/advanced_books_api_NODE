'use strict';

module.exports = (factory, Models) => {
  factory.define('Author', Models.Author, {
    firstName: 'Wolo',
    lastName: 'Cruz',
    createdAt: new Date(),
    updatedAt: new Date()
  });
};