const { ipcRenderer } = window.require("electron");

const create = (sendRoomId, receiveRoomId, amount, memo) => {
  const data = ipcRenderer.sendSync("stake-transfer-create", {
    sendRoomId,
    receiveRoomId,
    amount,
    memo,
  });
  return data;
};

const findAllByRoomId = (roomId) => {
  const data = ipcRenderer.sendSync("stake-transfer-find-all-by-room", {
    roomId,
  });
  return data;
};

const remove = (idList) => {
  const data = ipcRenderer.sendSync("stake-transfer-remove", {
    idList,
  });
  return data;
};

const stakeTransfers = {
  create,
  findAllByRoomId,
  remove,
};

export default stakeTransfers;
