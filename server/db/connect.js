const Sequelize = require('sequelize')

// const db = new Sequelize('cashbox', 'mmalkov', 'mmalkovcb3fs', {
//   host: process.env.DB_URL,
//   dialect: 'mysql'
// });
//'cashbox.cwgwhjyresgq.us-east-2.rds.amazonaws.com'
const db = new Sequelize('cashbox', 'cashusr', 'ohG846f734gyew', {
  host: 'mysql',
  dialect: 'mysql'
});

module.exports = db;
