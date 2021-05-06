const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

// 판매 주차권

const PaidTicket = sequelize.define(
  "PaidTicket",
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    roomId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    soldDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    payMethod: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bank: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    depositor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    period: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    proof: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isRnE: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    RCM: {
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
