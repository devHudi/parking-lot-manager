const Room = require("../models/Room");

const StakeTransferController = require("../controllers/StakeTransfer");
const CarController = require("../controllers/Car");

const calc = require("../utils/calc");

const getTotalStake = async (id) => {
  // 기본지분 + 수령지분 - 이전지분

  const room = (
    await Room.findOne({
      where: { id },
    })
  ).dataValues;

  const stakeTransfer = await StakeTransferController.findAllByRoomId(id);
  const stakeDelta = stakeTransfer.reduce((acc, cur) => {
    if (cur.sendRoomId === id) return acc - cur.amount;
    return acc + cur.amount;
  }, 0);

  return room.defaultStake + stakeDelta;
};

exports.getTotalStake = getTotalStake;

exports.create = async (id, company, type, areaM, memo) => {
  if (type !== "work" && type !== "store") {
    throw new Error("Room type error");
  }

  return await Room.create({
    id,
    company,
    type,
    areaM,
    memo,
    defaultStake: calc.stake(areaM),
  });
};

exports.findAll = async () => {
  const room = (await Room.findAll()).map(async (row) => {
    const totalStake = await getTotalStake(row.id);
    const cars = await CarController.findAllByRoomId(row.dataValues.id);
    const totalAmount = cars.length;
    const excessAmount = totalAmount - totalStake;

    return {
      ...row.dataValues,
      areaP: calc.m2p(row.areaM),
      totalStake,
      freeCars: cars.filter((car) => car.isFree),
      paidCars: cars.filter((car) => !car.isFree),
      totalAmount,
      excessAmount: excessAmount <= 0 ? 0 : excessAmount,
    };
  });

  /*
    TODO: 무료주차권도 반환 해야함
  */

  return await Promise.all(room);
};

exports.find = async (id) => {
  const obj = await Room.findOne({
    where: { id },
  });

  const totalStake = await getTotalStake(id);

  return { ...obj.dataValues, totalStake };

  /*
    TODO: 다른테이블에서 데이터를 가져와
          면적(평), 최종 지분, 무료차량 리스트, 유료차량 리스트,
          차량 초과대수, 총 차량 대수, 무료주차권
          위의 필드를 함께 반환해야함.
  */
};

exports.remove = async (idList) => {
  return await Room.destroy({
    where: {
      id: idList,
    },
  });

  // TODO: 관련된 다른 테이블도 지워야함
};

exports.update = async (id, company, type, areaM) => {
  return await Room.update(
    { company, type, areaM, defaultStake: calc.stake(areaM) },
    {
      where: {
        id,
      },
    }
  );
};
