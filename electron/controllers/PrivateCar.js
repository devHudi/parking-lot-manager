const PrivateCar = require("../models/PrivateCar");

const create = async (
  roomId,
  carNumber,
  carType,
  owner,
  contact,
  memo,
  carRegisterAt
) => {
  return await PrivateCar.create({
    roomId,
    carNumber,
    carType,
    owner,
    contact,
    memo,
    carRegisterAt,
  });
};

const findAll = async () => {
  const obj = await PrivateCar.findAll();

  return obj.map((row) => row.dataValues);

  /* TODO: roomId 통해서 입주사명(company) 도 가져와야함 */
};

const find = async (id) => {
  const obj = await PrivateCar.findOne({
    where: { id },
  });

  return obj.dataValues;
};

const remove = async (idList) => {
  return await PrivateCar.destroy({
    where: {
      id: idList,
    },
  });
};

const update = async (
  id,
  roomId,
  owner,
  contact,
  carNumber,
  carType,
  carRegisterAt
) => {
  return await PrivateCar.update(
    {
      roomId,
      owner,
      contact,
      carNumber,
      carType,
      carRegisterAt,
    },
    {
      where: {
        id,
      },
    }
  );
};

module.exports = { create, findAll, find, remove, update };
