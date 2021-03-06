const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

const StakeTransfer = sequelize.define(
  "StakeTransfer",
  {
    id: {
      primaryKey: true,
      type: DataTypes.STRING,
      allowNull: false,
    },
    sendRoomId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    receiveRoomId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    memo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "stakeTransfers",
    freezeTableName: true,
  }
);

StakeTransfer.sync();

module.exports = StakeTransfer;
