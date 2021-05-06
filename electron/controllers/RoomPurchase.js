const moment = require("moment");

const RoomPurchase = require("../models/RoomPurchase");
const Op = require("sequelize").Op;

exports.create = async (
  roomId,
  payMethod,
  bank,
  amount,
  fake,
  purchaseDate,
  isRnE,
  RCM,
  memo
) => {
  const obj = await RoomPurchase.create({
    roomId,
    payMethod,
    bank,
    amount,
    fake,
    purchaseDate,
    isRnE,
    RCM,
    memo,
  });
  return obj.dataValues;
};

exports.findAllByRoomId = async (roomId) => {
  const obj = await RoomPurchase.findAll({
    where: {
      roomId,
    },
    order: [["purchaseDate", "DESC"]],
  });
  return obj.map((row) => row.dataValues);
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
    order: [["purchaseDate", "DESC"]],
  });
  return obj.map((row) => row.dataValues);
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
    order: [["purchaseDate", "DESC"]],
  });
  return obj.map((row) => row.dataValues);
};
