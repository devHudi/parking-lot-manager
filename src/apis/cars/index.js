const { ipcRenderer } = window.require("electron");

const create = (roomId, carNumber, carType, owner, contact, memo) => {
  const data = ipcRenderer.sendSync("car-create", {
    roomId,
    carNumber,
    carType,
    owner,
    contact,
    memo,
  });
  return data;
};

const findAllByRoom = (roomId) => {
  const data = ipcRenderer.sendSync("car-find-all-by-room", { roomId });
  return data;
};

const remove = (idList) => {
  const data = ipcRenderer.sendSync("car-remove", {
    idList,
  });
  return data;
};

const cars = {
  create,
  findAllByRoom,
  remove,
};

export default cars;
