const Room = require("../models/Room");

const StakeTransferController = require("../controllers/StakeTransfer");
const CarController = require("../controllers/Car");
const FreeTicketController = require("../controllers/FreeTicket");
const RoomAcc = require("../controllers/RoomAcc");
const RoomPurchase = require("../controllers/RoomPurchase");

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
    const freeTickets = (
      await FreeTicketController.findAllByRoomId(row.id)
    ).reduce((acc, cur) => acc + cur.amount, 0);

    return {
      ...row.dataValues,
      areaP: calc.m2p(row.areaM),
      totalStake,
      freeCars: cars.filter((car) => car.isFree),
      paidCars: cars.filter((car) => !car.isFree),
      totalAmount,
      excessAmount: excessAmount <= 0 ? 0 : excessAmount,
      freeTickets,
    };
  });

  return await Promise.all(room);
};

exports.find = async (id) => {
  const obj = await Room.findOne({
    where: { id },
  });

  const totalStake = await getTotalStake(id);
  const freeTickets = (await FreeTicketController.findAllByRoomId(id)).reduce(
    (acc, cur) => acc + cur.amount,
    0
  );

  return { ...obj.dataValues, totalStake, freeTickets };
};

exports.remove = async (idList) => {
  return await Room.destroy({
    where: {
      id: idList,
    },
  });

  // TODO: 관련된 다른 테이블 (소속 차량, 개인 차량, 지분 이전 현황, 무료 주차권 현황, 부과현황, 수납현황)도 지워야함
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

exports.getAccTable = async (year, month) => {
  const accs = (await RoomAcc.findAllByDate(year, month)).map(async (acc) => {
    const room = (await Room.findOne({ where: { id: acc.roomId } })).dataValues;

    const purchaseAmount = (
      await RoomPurchase.findAllByRoomIdAndDate(room.id, year, month)
    ).reduce((acc, cur) => acc + cur.amount, 0);

    let accStatus = "미수납";
    if (purchaseAmount >= acc.amount) accStatus = "수납완료";
    else if (purchaseAmount > 0) accStatus = "부분수납";

    return {
      roomId: room.id,
      company: room.company,
      accView: room.id,
      print: acc.id,
      purchase: room.id,
      accAmount: acc.amount,
      purchaseAmount,
      accStatus,
    };
  });
  return await Promise.all(accs);
};
