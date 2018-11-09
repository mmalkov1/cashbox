const db = require('../connect');
const Sequelize = require('sequelize');

const Articles = db.define('cb_articles', {
  name : {
    type: Sequelize.STRING,
    allowNull: true
  },
  type: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  color: {
    type: Sequelize.STRING,
    allowNull: true
  }
})

module.exports = Articles;