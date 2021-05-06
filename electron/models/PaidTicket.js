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
    depositor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bank: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    period: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    soldDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    parkingDate: {
      type: DataTypes.DATE,
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
