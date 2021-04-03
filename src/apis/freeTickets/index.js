const { ipcRenderer } = window.require("electron");

const create = (roomId, amount, type, memo) => {
  const data = ipcRenderer.sendSync("free-tickets-create", {
    roomId,
    amount,
    type,
    memo,
  });
  return data;
};

const findAllByRoomId = (roomId) => {
  const data = ipcRenderer.sendSync("free-tickets-find-all-by-room", {
    roomId,
  });
  return data;
};

const remove = (idList) => {
  const data = ipcRenderer.sendSync("free-tickets-remove", {
    idList,
  });
  return data;
};

const freeTickets = {
  create,
  findAllByRoomId,
  remove,
};

export default freeTickets;
