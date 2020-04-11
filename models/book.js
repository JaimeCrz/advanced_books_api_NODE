'use strict';

module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {});

  Book.associate = models => {
    Book.belongsTo(models.Author, { oreignKey: 'AuthorId', as: 'author' })
  };

  return Book;
};