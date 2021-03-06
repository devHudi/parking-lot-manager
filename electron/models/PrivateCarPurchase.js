const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

// 월별 호실 수납

const PrivateCarPurchase = sequelize.define(
  "PrivateCarPurchase",
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
    memo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "privateCarPurchases",
    freezeTableName: true,
  }
);

PrivateCarPurchase.sync();

module.exports = PrivateCarPurchase;
