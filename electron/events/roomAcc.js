const { ipcMain } = require("electron");
const Controllers = require("../controllers");

const init = () => {
  ipcMain.on("room-acc-create", async (event, args) => {
    event.returnValue = await Controllers.RoomAcc.create();
  });

  ipcMain.on("room-acc-find-all", async (event, args) => {
    event.returnValue = await Controllers.RoomAcc.findAll();
  });
};

module.exports = init;
