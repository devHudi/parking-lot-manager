const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

// 월별 호실 수납

const RoomPurchase = sequelize.define(
  "RoomPurchase",
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
    amount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    fake: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    purchaseDate: {
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
    tableName: "roomPurchases",
    freezeTableName: true,
  }
);

RoomPurchase.sync();

module.exports = RoomPurchase;
