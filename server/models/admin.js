
const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const Admin = sequelize.define('Admin', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false, unique: true }
});

module.exports = Admin;
