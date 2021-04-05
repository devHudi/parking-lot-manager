const moment = require("moment");

const RoomPurchase = require("../models/RoomPurchase");
const Op = require("Sequelize").Op;

exports.create = async (roomId, bank, amount, fake, purchaseDate, memo) => {
  const obj = await RoomPurchase.create({
    roomId,
    bank,
    amount,
    fake,
    purchaseDate,
    memo,
  });
  return obj.dataValues;
};

exports.findAllByRoomId = async (roomId) => {
  const obj = await RoomPurchase.findAll({
    where: {
      roomId,
    },
  });
  return obj.map((row) => row.dataValues);
  // TODO: purchaseDate 로 내림차순 필요
};

exports.findAllByDate = async (year, month) => {
  const startDate = moment(`${year}/${month}/1`).startOf("month").toDate();
  const endDate = moment(startDate).endOf("month").toDate();

  const obj = await RoomPurchase.findAll({
    where: {
      purchaseDate: {
        [Op.between]: [startDate, endDate],
      },
    },
  });
  return obj.map((row) => row.dataValues);
  // TODO: purchaseDate 로 내림차순 필요
};

exports.findAllByRoomIdAndDate = async (roomId, year, month) => {
  const startDate = moment(`${year}/${month}/1`).startOf("month").toDate();
  const endDate = moment(startDate).endOf("month").toDate();

  const obj = await RoomPurchase.findAll({
    where: {
      roomId,
      purchaseDate: {
        [Op.between]: [startDate, endDate],
      },
    },
  });
  return obj.map((row) => row.dataValues);

  // TODO: purchaseDate 로 내림차순 필요
};
