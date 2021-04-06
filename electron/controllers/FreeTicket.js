const moment = require("moment");

const FreeTicket = require("../models/FreeTicket");
const Op = require("sequelize").Op;

const RoomController = require("./Room");

exports.monthlyGiving = async () => {
  // 무료주차권 월간 일괄 지급
  const rooms = await RoomController.findAll();

  const startDate = moment().startOf("month").toDate();
  const endDate = moment().endOf("month").toDate();

  const alreadyGaveRoomList = (
    await FreeTicket.findAll({
      where: {
        createdAt: {
          [Op.between]: [startDate, endDate],
        },
      },
    })
  )
    .map((ticket) => ticket.dataValues.roomId)
    .reduce((acc, cur) => {
      if (acc.indexOf(cur) === -1) return [...acc, cur];
      return acc;
    }, []);

  const tickets = rooms
    .filter((room) => alreadyGaveRoomList.indexOf(room.id) === -1)
    .map((room) => {
      const amount = 50 * (room.totalStake - room.freeCars.length);
      return {
        roomId: room.id,
        amount,
        type: "GET",
        memo: "월간 일괄 지급",
      };
    });

  FreeTicket.bulkCreate(tickets);

  return { tickets, startDate, endDate, alreadyGaveRoomList };
};

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
