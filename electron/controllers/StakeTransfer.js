const StakeTransfer = require("../models/StakeTransfer");
const Op = require("Sequelize").Op;

const create = async (sendRoomId, receiveRoomId, amount, memo) => {
  return await StakeTransfer.create({
    sendRoomId,
    receiveRoomId,
    amount,
    memo,
  });
};

const findAllByRoomId = async (roomId) => {
  const obj = await StakeTransfer.findAll({
    where: {
      [Op.or]: [
        {
          sendRoomId: roomId,
        },
        {
          receiveRoomId: roomId,
        },
      ],
    },
  });
  return obj.map((row) => row.dataValues);
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
