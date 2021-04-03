const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

const PrivateCar = sequelize.define(
  "PrivateCar",
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
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
    carRegisterAt: {
      type: DataTypes.DATE,
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
