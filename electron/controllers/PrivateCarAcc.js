const moment = require("moment");

const PrivateCarAcc = require("../models/PrivateCarAcc");
const Op = require("sequelize").Op;

const PrivateCar = require("./PrivateCar");

exports.create = async (year, month) => {
  const privateCars = await PrivateCar.findAll();

  const startDate = moment([year, month - 1])
    .startOf("month")
    .toDate();
  const endDate = moment([year, month - 1])
    .endOf("month")
    .toDate();

  await PrivateCarAcc.destroy({
    where: {
      createdAt: {
        [Op.between]: [startDate, endDate],
      },
    },
  });

  const accs = privateCars
    .map((car) => {
      const amount = 110000;
      return {
        privateCarId: car.id,
        amount,
        createdAt: moment([year, month - 1]).toDate(),
      };
    })
    .filter((car) => car.amount !== 0);

  PrivateCarAcc.bulkCreate(accs);

  return accs;
};

exports.findAll = async () => {
  const obj = await PrivateCarAcc.findAll();
  return obj.map((row) => row.dataValues);
};

exports.findAllByDate = async (year, month) => {
  const startDate = moment(`${year}/${month}/1`).startOf("month").toDate();
  const endDate = moment(startDate).endOf("month").toDate();

  const obj = await PrivateCarAcc.findAll({
    where: {
      createdAt: {
        [Op.between]: [startDate, endDate],
      },
    },
  });

  return obj.map((row) => row.dataValues);
};

exports.findByPrivateCarIdAndDate = async (privateCarId, year, month) => {
  const startDate = moment(`${year}/${month}/1`).startOf("month").toDate();
  const endDate = moment(startDate).endOf("month").toDate();

  const obj = await PrivateCarAcc.findOne({
    where: {
      privateCarId,
      createdAt: {
        [Op.between]: [startDate, endDate],
      },
    },
  });
  return obj.dataValues;
};
