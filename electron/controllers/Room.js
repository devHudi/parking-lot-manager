const Room = require("../models/Room");
const StakeTransfer = require("../models/StakeTransfer");

const calc = require("../utils/calc");

const create = async (id, company, type, areaM, memo) => {
  if (type !== "work" && type !== "store") {
    throw new Error("Room type error");
  }

  return await Room.create({
    id,
    company,
    type,
    areaM,
    memo,
    defaultStake: calc.stake(areaM),
  });
};

const findAll = async () => {
  const obj = await Room.findAll();
  return obj;
};

const find = async (id) => {
  const obj = await Room.findOne({
    where: { id },
  });

  return obj.dataValues;
};

const remove = async (idList) => {
  return await Room.destroy({
    where: {
      id: idList,
    },
  });
};

const update = async (id, options) => {
  return await Room.update(options, {
    where: {
      id,
    },
  });
};

module.exports = { create, findAll, find, remove, update };
