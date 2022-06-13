'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tour extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tour.belongsTo(models.Allcode, {foreignKey:'price',targetKey:'keyMap', as:'priceData'});
      Tour.belongsTo(models.Allcode, {foreignKey:'country',targetKey:'keyMap', as:'countryData'});
    }
  }
  Tour.init({
    name: DataTypes.TEXT,
    country: DataTypes.TEXT,
    price: DataTypes.TEXT,
    descriptionMarkdown: DataTypes.TEXT,
    descriptionHTML: DataTypes.TEXT,
    image: DataTypes.TEXT,
    video: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Tour',
  });
  return Tour;
};