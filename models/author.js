'use strict';
module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define('Author', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.get('firstName')} ${this.get('lastName')}`
      }
    }
  }, {});
  Author.associate = models => {
    Author.hasMany(models.Book, {as: 'books'});
  };
  return Author;
};