const PaidTicket = require("../models/PaidTicket");

const create = async (
  id,
  carNumber,
  carType,
  owner,
  contact,
  payMethod,
  type,
  memo
) => {
  if (type !== "30M" && type !== "1H" && type !== "1D") {
    throw new Error("Paid ticket type error");
  }

  return await PaidTicket.create({
    id,
    carNumber,
    carType,
    owner,
    contact,
    payMethod,
    type,
    memo,
  });
};

const findAll = async (startDate, endDate) => {
  const obj = await PaidTicket.findAll({
    where: {
      from: {
        $between: [startDate, endDate],
      },
    },
  });

  return obj.dataValues;
};

const remove = async (idList) => {
  return await PaidTicket.destroy({
    where: {
      id: idList,
    },
  });
};

module.exports = { create, findAll, remove };
