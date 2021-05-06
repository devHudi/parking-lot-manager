const { ipcRenderer } = window.require("electron");

const create = (
  roomId,
  payMethod,
  depositor,
  bank,
  amount,
  fake,
  purchaseDate,
  isRnE,
  RCM,
  memo
) => {
  const data = ipcRenderer.sendSync("room-purchase-create", {
    roomId,
    payMethod,
    depositor,
    bank,
    amount,
    fake,
    purchaseDate,
    isRnE,
    RCM,
    memo,
  });
  return data;
};

const findAllByRoomId = (roomId) => {
  const data = ipcRenderer.sendSync("room-purchase-find-all-by-room-id", {
    roomId,
  });
  return data;
};

const findAllByDate = (year, month) => {
  const data = ipcRenderer.sendSync("room-purchase-find-all-by-date", {
    year,
    month,
  });
  return data;
};

const roomAccs = {
  create,
  findAllByRoomId,
  findAllByDate,
};

export default roomAccs;
