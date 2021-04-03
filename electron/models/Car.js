const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

const Car = sequelize.define(
  "Car",
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
    memo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "cars",
    freezeTableName: true,
  }
);

Car.sync();

module.exports = Car;
