const PrivateCar = require("../models/PrivateCar");

const PrivateCarAcc = require("../controllers/PrivateCarAcc");
const PrivateCarPurchase = require("../controllers/PrivateCarPurchase");

const Room = require("../controllers/Room");

exports.create = async (
  privateCarId,
  carNumber,
  carType,
  owner,
  contact,
  memo,
  carRegisterAt
) => {
  return await PrivateCar.create({
    privateCarId,
    carNumber,
    carType,
    owner,
    contact,
    memo,
    carRegisterAt,
  });
};

exports.findAll = async () => {
  const obj = await PrivateCar.findAll();

  return obj.map((row) => row.dataValues);

  /* TODO: roomId 통해서 입주사명(company) 도 가져와야함 */
};

exports.find = async (id) => {
  const obj = await PrivateCar.findOne({
    where: { id },
  });

  return obj.dataValues;
};

exports.remove = async (idList) => {
  return await PrivateCar.destroy({
    where: {
      id: idList,
    },
  });
};

exports.update = async (
  id,
  privateCarId,
  owner,
  contact,
  carNumber,
  carType,
  carRegisterAt
) => {
  return await PrivateCar.update(
    {
      privateCarId,
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

exports.getAccTable = async (year, month) => {
  const accs = (await PrivateCarAcc.findAllByDate(year, month)).map(
    async (acc) => {
      const car = (
        await PrivateCar.findOne({ where: { id: acc.privateCarId } })
      ).dataValues;

      const room = await Room.find(car.roomId);

      const purchaseAmount = (
        await PrivateCarPurchase.findAllByPrivateCarIdAndDate(
          car.id,
          year,
          month
        )
      ).reduce((acc, cur) => acc + cur.amount, 0);

      let accStatus = "미수납";
      if (purchaseAmount >= acc.amount) accStatus = "수납완료";
      else if (purchaseAmount > 0) accStatus = "부분수납";

      return {
        roomId: car.roomId,
        company: room.company,
        carNumber: car.carNumber,
        carType: car.carType,
        owner: car.owner,
        contact: car.contact,
        accView: car.id,
        print: acc.id,
        purchase: car.id,
        accAmount: acc.amount,
        purchaseAmount,
        accStatus,
      };
    }
  );
  return await Promise.all(accs);
};
