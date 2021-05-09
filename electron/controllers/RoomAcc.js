const moment = require("moment");

const RoomAcc = require("../models/RoomAcc");
const Op = require("sequelize").Op;

const RoomController = require("./Room");

exports.create = async (year, month) => {
  const rooms = await RoomController.findAll();

  const startDate = moment([year, month - 1])
    .startOf("month")
    .toDate();
  const endDate = moment([year, month - 1])
    .endOf("month")
    .toDate();

  await RoomAcc.destroy({
    where: {
      createdAt: {
        [Op.between]: [startDate, endDate],
      },
    },
  });

  const accs = rooms
    .map((room) => {
      const amount = 110000 * room.excessAmount;
      return {
        roomId: room.id,
        amount,
        createdAt: moment([year, month - 1]).toDate(),
      };
    })
    .filter((room) => room.amount !== 0);

  RoomAcc.bulkCreate(accs);

  return accs;
};

exports.findAll = async () => {
  const obj = await RoomAcc.findAll();
  return obj.map((row) => row.dataValues);
};

exports.findAllByDate = async (year, month) => {
  const startDate = moment(`${year}/${month}/1`).startOf("month").toDate();
  const endDate = moment(startDate).endOf("month").toDate();

  const obj = await RoomAcc.findAll({
    where: {
      createdAt: {
        [Op.between]: [startDate, endDate],
      },
    },
  });

  return obj.map((row) => row.dataValues);
};

exports.findByRoomIdAndDate = async (roomId, year, month) => {
  const startDate = moment(`${year}/${month}/1`).startOf("month").toDate();
  const endDate = moment(startDate).endOf("month").toDate();

  const obj = await RoomAcc.findAll({
    where: {
      roomId,
      createdAt: {
        [Op.between]: [startDate, endDate],
      },
    },
  });

  return obj.map((row) => row.dataValues);
};
