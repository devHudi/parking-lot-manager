const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

// 월별 호실 부과

const RoomAcc = sequelize.define(
  "RoomAcc",
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
  },
  {
    tableName: "roomAccs",
    freezeTableName: true,
  }
);

RoomAcc.sync();

module.exports = RoomAcc;
