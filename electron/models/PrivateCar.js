const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

const PrivateCar = sequelize.define(
  "PrivateCar",
  {
    id: {
      primaryKey: true,
      type: DataTypes.STRING,
      allowNull: false,
    },
    roomId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    carNumber: {
      type: DataTypes.STRING,
      allowNull: true,
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
    memo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "privateCars",
    freezeTableName: true,
  }
);

PrivateCar.sync();

module.exports = PrivateCar;
