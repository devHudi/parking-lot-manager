const moment = require("moment");

const PrivateCarPurchase = require("../models/PrivateCarPurchase");
const Op = require("Sequelize").Op;

exports.create = async (
  privateCarId,
  bank,
  amount,
  fake,
  purchaseDate,
  memo
) => {
  const obj = await PrivateCarPurchase.create({
    privateCarId,
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
  });
  return obj.map((row) => row.dataValues);
  // TODO: purchaseDate 로 내림차순 필요
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
  });
  return obj.map((row) => row.dataValues);
  // TODO: purchaseDate 로 내림차순 필요
};
