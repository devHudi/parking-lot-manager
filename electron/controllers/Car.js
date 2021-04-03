const Car = require("../models/Car");

const create = async (roomId, carNumber, carType, owner, contact, memo) => {
  return await Car.create({
    roomId,
    carNumber,
    carType,
    owner,
    contact,
    memo,
  });
};

const findAllByRoomId = async (roomId) => {
  const obj = await Car.findAll({
    where: {
      roomId,
    },
  });

  return obj.map((row) => row.dataValues);
};

const find = async (id) => {
  const obj = await Car.findOne({
    where: { id },
  });

  return obj.dataValues;
};

const remove = async (idList) => {
  return await Car.destroy({
    where: {
      id: idList,
    },
  });
};

const update = async (id, options) => {
  return await Car.update(options, {
    where: {
      id,
    },
  });
};

module.exports = { create, findAllByRoomId, find, remove, update };
