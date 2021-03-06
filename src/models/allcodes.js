'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Allcode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Allcode.hasMany(models.User, { foreignKey: 'gender', as: 'genderData' });
      Allcode.hasMany(models.Tour, { foreignKey: 'price', as: 'priceData' });
      Allcode.hasMany(models.Tour, { foreignKey: 'country', as: 'countryData' });
    }
  }
  Allcode.init({
    keyMap: DataTypes.TEXT,
    type: DataTypes.TEXT,
    value: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Allcode',
  });
  return Allcode;
};