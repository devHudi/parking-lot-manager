const Room = require("../models/Room");
const StakeTransfer = require("../models/StakeTransfer");

const calc = require("../utils/calc");

const create = async (id, company, type, areaM, memo) => {
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

const findAll = async () => {
  const obj = await Room.findAll();
  return obj.map((row) => row.dataValues);

  /*
    TODO: 다른테이블에서 데이터를 가져와
          면적(평), 최종 지분, 무료차량 리스트, 유료차량 리스트,
          차량 초과대수, 총 차량 대수, 무료주차권
          위의 필드를 함께 반환해야함.
  */
};

const find = async (id) => {
  const obj = await Room.findOne({
    where: { id },
  });

  return obj.dataValues;

  /*
    TODO: 다른테이블에서 데이터를 가져와
          면적(평), 최종 지분, 무료차량 리스트, 유료차량 리스트,
          차량 초과대수, 총 차량 대수, 무료주차권
          위의 필드를 함께 반환해야함.
  */
};

const remove = async (idList) => {
  return await Room.destroy({
    where: {
      id: idList,
    },
  });

  // TODO: 관련된 다른 테이블도 지워야함
};

const update = async (id, company, type, areaM) => {
  return await Room.update(
    { company, type, areaM, defaultStake: calc.stake(areaM) },
    {
      where: {
        id,
      },
    }
  );
};

module.exports = { create, findAll, find, remove, update };
