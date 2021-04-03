const FreeTicket = require("../models/FreeTicket");

exports.create = async (roomId, amount, type, memo) => {
  return await FreeTicket.create({
    roomId,
    amount,
    type,
    memo,
  });
};

exports.findAllByRoomId = async (roomId) => {
  const obj = await FreeTicket.findAll({
    where: {
      roomId,
    },
  });

  return obj.map((row) => row.dataValues);
};

exports.remove = async (idList) => {
  return await FreeTicket.destroy({
    where: {
      id: idList,
    },
  });
};
