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

const findAllByRoomId = (roomId) => {
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
  findAllByRoomId,
  remove,
};

export default cars;
