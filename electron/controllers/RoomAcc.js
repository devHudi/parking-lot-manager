const moment = require("moment");

const RoomAcc = require("../models/RoomAcc");
const Op = require("Sequelize").Op;

const RoomController = require("./Room");

exports.create = async () => {
  // 무료주차권 월간 일괄 지급
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
};
