const { ipcMain } = require("electron");
const Controllers = require("../controllers");

const init = () => {
  ipcMain.on("free-tickets-find-all-by-room", async (event, args) => {
    const { roomId } = args;
    event.returnValue = await Controllers.FreeTicket.findAllByRoomId(roomId);
  });

  ipcMain.on("free-tickets-create", async (event, args) => {
    const { roomId, amount, type, memo } = args;
    event.returnValue = await Controllers.FreeTicket.create(
      roomId,
      amount,
      type,
      memo
    );
  });

  ipcMain.on("free-tickets-remove", async (event, args) => {
    const { idList } = args;
    event.returnValue = await Controllers.FreeTicket.remove(idList);
  });
};

module.exports = init;
