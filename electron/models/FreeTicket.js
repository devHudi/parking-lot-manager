const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

// 무료 주차권

const FreeTicket = sequelize.define(
  "FreeTicket",
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    roomId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    type: {
      // "GET" or "USE"
      type: DataTypes.STRING,
      allowNull: true,
    },
    memo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "freeTickets",
    freezeTableName: true,
  }
);

FreeTicket.sync();

module.exports = FreeTicket;
