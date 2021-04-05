const { ipcRenderer } = window.require("electron");

const create = (roomId, bank, amount, fake, purchaseDate, memo) => {
  console.log(roomId, bank, amount, fake, purchaseDate, memo);
  const data = ipcRenderer.sendSync("room-purchase-create", {
    roomId,
    bank,
    amount,
    fake,
    purchaseDate,
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
