const moment = require("moment");

const RoomAcc = require("../models/RoomAcc");
const Op = require("sequelize").Op;

const RoomController = require("./Room");

exports.create = async () => {
  const rooms = await RoomController.findAll();

  const startDate = moment().startOf("month").toDate();
  const endDate = moment().endOf("month").toDate();

  const alreadyGaveRoomList = (
    await RoomAcc.findAll({
      where: {
        createdAt: {
          [Op.between]: [startDate, endDate],
        },
      },
    })
  )
    .map((acc) => acc.dataValues.roomId)
    .reduce((acc, cur) => {
      // 중복제거
      if (acc.indexOf(cur) === -1) return [...acc, cur];
      return acc;
    }, []);

  const accs = rooms
    .filter((room) => alreadyGaveRoomList.indexOf(room.id) === -1)
    .map((room) => {
      const amount = 110000 * room.excessAmount;
      return {
        roomId: room.id,
        amount,
      };
    });

  RoomAcc.bulkCreate(accs);

  return { rooms, startDate, endDate, alreadyGaveRoomList, accs };
};

exports.findAll = async () => {
  const obj = await RoomAcc.findAll();
  return obj.map((row) => row.dataValues);
  // TODO: year, month 로 필터링 해야함
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
