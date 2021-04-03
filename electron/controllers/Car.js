const Car = require("../models/Car");

const RoomController = require("../controllers/Room");

exports.create = async (roomId, carNumber, carType, owner, contact, memo) => {
  return await Car.create({
    roomId,
    carNumber,
    carType,
    owner,
    contact,
    memo,
  });
};

exports.findAllByRoomId = async (roomId) => {
  const obj = await Car.findAll({
    where: {
      roomId,
    },
  });

  const totalStake = await RoomController.getTotalStake(roomId);

  return obj.map((row, idx) => {
    const isFree = idx + 1 <= totalStake;
    return { ...row.dataValues, isFree };
  });
};

exports.remove = async (idList) => {
  return await Car.destroy({
    where: {
      id: idList,
    },
  });
};

exports.update = async (id, options) => {
  return await Car.update(options, {
    where: {
      id,
    },
  });
};
