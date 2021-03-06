const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

const Room = sequelize.define(
  "Room",
  {
    id: {
      primaryKey: true,
      type: DataTypes.STRING,
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    areaM: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    defaultStake: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    memo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "rooms",
    freezeTableName: true,
  }
);

Room.sync();

module.exports = Room;
