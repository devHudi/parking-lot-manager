const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

// 판매 주차권

const PaidTicket = sequelize.define(
  "PaidTicket",
  {
    id: {
      primaryKey: true,
      type: DataTypes.STRING,
      allowNull: false,
    },
    carNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    carType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    owner: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    payMethod: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    memo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "paidTickets",
    freezeTableName: true,
  }
);

PaidTicket.sync();

module.exports = PaidTicket;
