const moment = require("moment");

const PrivateCarPurchase = require("../models/PrivateCarPurchase");
const Op = require("sequelize").Op;

exports.create = async (
  privateCarId,
  payMethod,
  bank,
  amount,
  fake,
  purchaseDate,
  memo
) => {
  const obj = await PrivateCarPurchase.create({
    privateCarId,
    payMethod,
    bank,
    amount,
    fake,
    purchaseDate,
    memo,
  });
  return obj.dataValues;
};

exports.findAllByPrivateCarId = async (privateCarId) => {
  const obj = await PrivateCarPurchase.findAll({
    where: {
      privateCarId,
    },
    order: [["purchaseDate", "DESC"]],
  });
  return obj.map((row) => row.dataValues);
};

exports.findAllByDate = async (year, month) => {
  const startDate = moment(`${year}/${month}/1`).startOf("month").toDate();
  const endDate = moment(startDate).endOf("month").toDate();

  const obj = await PrivateCarPurchase.findAll({
    where: {
      purchaseDate: {
        [Op.between]: [startDate, endDate],
      },
    },
    order: [["purchaseDate", "DESC"]],
  });
  return obj.map((row) => row.dataValues);
};

exports.findAllByPrivateCarIdAndDate = async (privateCarId, year, month) => {
  const startDate = moment(`${year}/${month}/1`).startOf("month").toDate();
  const endDate = moment(startDate).endOf("month").toDate();

  const obj = await PrivateCarPurchase.findAll({
    where: {
      privateCarId,
      purchaseDate: {
        [Op.between]: [startDate, endDate],
      },
    },
    order: [["purchaseDate", "DESC"]],
  });
  return obj.map((row) => row.dataValues);
};
