const { ipcMain } = require("electron");
const Controllers = require("../controllers");

const init = () => {
  ipcMain.on("room-create", (event, args) => {
    const { room, company, type, areaM, memo } = args;
    Controllers.Room.create(room, company, type, areaM, memo);
  });

  ipcMain.on("room-find-all", async (event, args) => {
    event.returnValue = await Controllers.Room.findAll();
  });

  ipcMain.on("room-find-one", async (event, args) => {
    const { id } = args;
    event.returnValue = await Controllers.Room.find(id);
  });
};

module.exports = init;
