const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

// 월별 개인 차량 부과

const PrivateCarAcc = sequelize.define(
  "PrivateCarAcc",
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    privateCarId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "privateCarAccs",
    freezeTableName: true,
  }
);

PrivateCarAcc.sync();

module.exports = PrivateCarAcc;
