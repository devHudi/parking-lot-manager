const moment = require("moment");

const PrivateCarAcc = require("../models/PrivateCarAcc");
const Op = require("sequelize").Op;

const PrivateCar = require("./PrivateCar");

exports.create = async () => {
  const privateCars = await PrivateCar.findAll();

  const startDate = moment().startOf("month").toDate();
  const endDate = moment().endOf("month").toDate();

  const alreadyGaveCarList = (
    await PrivateCarAcc.findAll({
      where: {
        createdAt: {
          [Op.between]: [startDate, endDate],
        },
      },
    })
  )
    .map((acc) => acc.dataValue.privateCarId)
    .reduce((acc, cur) => {
      // 중복제거
      if (acc.indexOf(cur) === -1) return [...acc, cur];
      return acc;
    }, []);

  const accs = privateCars
    .filter((car) => alreadyGaveCarList.indexOf(car.id) === -1)
    .map((car) => {
      const amount = 110000;
      return {
        privateCarId: car.id,
        amount,
      };
    });

  const obj = PrivateCarAcc.bulkCreate(accs);

  return obj.dataValues;
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
