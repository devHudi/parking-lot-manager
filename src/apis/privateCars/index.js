const { ipcRenderer } = window.require("electron");

const create = (
  roomId,
  carNumber,
  carType,
  owner,
  contact,
  memo,
  carRegisterAt
) => {
  const data = ipcRenderer.sendSync("private-car-create", {
    roomId,
    carNumber,
    carType,
    owner,
    contact,
    memo,
    carRegisterAt,
  });
  return data;
};

const findAll = () => {
  const data = ipcRenderer.sendSync("private-car-find-all");
  return data;
};

const find = (id) => {
  const data = ipcRenderer.sendSync("private-car-find", { id });
  return data;
};

const remove = (idList) => {
  const data = ipcRenderer.sendSync("private-car-remove", {
    idList,
  });
  return data;
};

const update = (
  id,
  roomId,
  owner,
  contact,
  carNumber,
  carType,
  carRegisterAt
) => {
  const data = ipcRenderer.sendSync("private-car-update", {
    id,
    roomId,
    owner,
    contact,
    carNumber,
    carType,
    carRegisterAt,
  });
  return data;
};

const getAccTable = (year, month) => {
  const data = ipcRenderer.sendSync("private-car-get-acc-table", {
    year,
    month,
  });
  return data;
};

const cars = {
  create,
  find,
  findAll,
  update,
  remove,
  getAccTable,
};

export default cars;
