const PrivateCar = require("../models/PrivateCar");

const create = async (id, roomId, carNumber, carType, owner, contact, memo) => {
  return await PrivateCar.create({
    id,
    roomId,
    carNumber,
    carType,
    owner,
    contact,
    memo,
  });
};

const findAllByRoomId = async (roomId) => {
  const obj = await PrivateCar.findAll({
    where: {
      roomId,
    },
  });

  return obj.dataValues;
};

const find = async (id) => {
  const obj = await PrivateCar.findOne({
    where: { id },
  });

  return obj.dataValues;
};

const remove = async (idList) => {
  return await PrivateCar.destroy({
    where: {
      id: idList,
    },
  });
};

const update = async (id, options) => {
  return await PrivateCar.update(options, {
    where: {
      id,
    },
  });
};

module.exports = { create, findAllByRoomId, find, remove, update };
