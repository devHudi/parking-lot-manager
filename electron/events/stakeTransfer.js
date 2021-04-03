const { ipcMain } = require("electron");
const Controllers = require("../controllers");

const init = () => {
  ipcMain.on("stake-transfer-find-all-by-room", async (event, args) => {
    const { roomId } = args;
    event.returnValue = await Controllers.StakeTransfer.findAllByRoomId(roomId);
  });

  ipcMain.on("stake-transfer-create", async (event, args) => {
    const { sendRoomId, receiveRoomId, amount, memo } = args;
    event.returnValue = await Controllers.StakeTransfer.create(
      sendRoomId,
      receiveRoomId,
      amount,
      memo
    );
  });

  ipcMain.on("stake-transfer-update", async (event, args) => {
    const { id, options } = args;
    event.returnValue = await Controllers.StakeTransfer.update(id, options);
  });

  ipcMain.on("stake-transfer-remove", async (event, args) => {
    const { idList } = args;
    event.returnValue = await Controllers.StakeTransfer.remove(idList);
  });
};

module.exports = init;
