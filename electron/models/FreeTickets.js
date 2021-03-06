const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

// 무료 주차권

const FreeTicket = sequelize.define(
  "FreeTicket",
  {
    id: {
      primaryKey: true,
      type: DataTypes.STRING,
      allowNull: false,
    },
    roomId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      // "GET" or "USE"
      type: DataTypes.STRING,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATE,
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
