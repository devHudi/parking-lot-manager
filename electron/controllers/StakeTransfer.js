const StakeTransfer = require("../models/StakeTransfer");

const create = async (id, sendRoomId, receiveRoomId, amount, memo) => {
  return await StakeTransfer.create({
    id,
    sendRoomId,
    receiveRoomId,
    amount,
    memo,
  });
};

const findAllByRoomId = async (roomId) => {
  const obj = await StakeTransfer.findAll({
    where: {
      $or: [
        {
          sendRoomId: roomId,
        },
        {
          receiveRoomId: roomId,
        },
      ],
    },
  });

  return obj.dataValues;
};

const find = async (id) => {
  const obj = await StakeTransfer.findOne({
    where: { id },
  });

  return obj.dataValues;
};

const remove = async (idList) => {
  return await StakeTransfer.destroy({
    where: {
      id: idList,
    },
  });
};

const update = async (id, options) => {
  return await StakeTransfer.update(options, {
    where: {
      id,
    },
  });
};

module.exports = { create, findAllByRoomId, find, remove, update };
