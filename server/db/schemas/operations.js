const db = require('../connect');
const Sequelize = require('sequelize');

const Operations = db.define('cb_operations', {
  type : {
    type: Sequelize.STRING,
    allowNull: true
  },
  typeId : {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  name : {
    type: Sequelize.STRING,
    allowNull: true
  },
  nameId : {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  comment : {
    type: Sequelize.STRING,
    allowNull: true
  },
  operatorName : {
    type: Sequelize.STRING,
    allowNull: true
  },
  operatorId : {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  total : {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  bonus : {
    type: Sequelize.INTEGER,
    allowNull: true
  }
})

module.exports = Operations;