const db = require('../connect');
const Sequelize = require('sequelize');

const Users = db.define('cb_users', {
  username : {
    type: Sequelize.STRING,
    allowNull: true
  },
  password : {
    type: Sequelize.STRING,
    allowNull: true
  },
  name : {
    type: Sequelize.STRING,
    allowNull: true
  },
  role : {
    type: Sequelize.INTEGER,
    allowNull: true
  },

})

module.exports = Users;