const PaidTicket = require("../models/PaidTicket");
const Op = require("Sequelize").Op;

const create = async (
  carNumber,
  carType,
  owner,
  contact,
  payMethod,
  period,
  soldDate,
  parkingDate,
  memo
) => {
  if (period !== "30M" && period !== "1H" && period !== "1D") {
    throw new Error("Paid ticket period error");
  }

  return await PaidTicket.create({
    carNumber,
    carType,
    owner,
    contact,
    payMethod,
    period,
    soldDate,
    parkingDate,
    memo,
  });
};

const findAll = async () => {
  const obj = await PaidTicket.findAll({
    order: [["soldDate", "DESC"]],
  });
  return obj.map((row) => row.dataValues);
};

const findAllByDate = async (startDate, endDate) => {
  const obj = (
    await PaidTicket.findAll({
      where: {
        soldDate: {
          [Op.between]: [startDate, endDate],
        },
      },
      order: [["soldDate", "DESC"]],
    })
  ).map((row) => row.dataValues);

  return obj;
};

const remove = async (idList) => {
  return await PaidTicket.destroy({
    where: {
      id: idList,
    },
  });
};

module.exports = { create, findAll, findAllByDate, remove };
