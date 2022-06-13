'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tours', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.TEXT
      },
      price:{
        type: Sequelize.TEXT
      },
      video:{
        type: Sequelize.TEXT
      },      
      country:{
        type: Sequelize.TEXT
      },
      descriptionHTML:{
        type: Sequelize.TEXT
      },
      descriptionMarkdown:{
        type: Sequelize.TEXT
      },   
      image: {
        type: Sequelize.BLOB('long'),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tours');
  }
};