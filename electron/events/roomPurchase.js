const { ipcMain } = require("electron");
const Controllers = require("../controllers");

const init = () => {
  ipcMain.on("room-purchase-create", async (event, args) => {
    const {
      roomId,
      payMethod,
      bank,
      amount,
      fake,
      purchaseDate,
      isRnE,
      RCM,
      memo,
    } = args;
    event.returnValue = await Controllers.RoomPurchase.create(
      roomId,
      payMethod,
      bank,
      amount,
      fake,
      purchaseDate,
      isRnE,
      RCM,
      memo
    );
  });

  ipcMain.on("room-purchase-find-all-by-room-id", async (event, args) => {
    const { roomId } = args;
    event.returnValue = await Controllers.RoomPurchase.findAllByRoomId(roomId);
  });

  ipcMain.on("room-purchase-find-all-by-date", async (event, args) => {
    const { year, month } = args;
    event.returnValue = await Controllers.RoomPurchase.findAllByDate(
      year,
      month
    );
  });
};

module.exports = init;
