const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

// 월별 개인 차량 부과

const PrivateCarAcc = sequelize.define(
  "PrivateCarAcc",
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
    amount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "privateCarAcc",
    freezeTableName: true,
  }
);

PrivateCarAcc.sync();

module.exports = PrivateCarAcc;
