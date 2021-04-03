const PaidTicket = require("../models/PaidTicket");

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
  const obj = await PaidTicket.findAll();
  return obj.map((row) => row.dataValues);
};

const findAllByDate = async (startDate, endDate) => {
  const obj = (
    await PaidTicket.findAll({
      where: {
        from: {
          $between: [startDate, endDate],
        },
      },
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
