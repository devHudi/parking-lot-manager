const { ipcMain } = require("electron");
const Controllers = require("../controllers");

const init = () => {
  ipcMain.on("private-car-acc-create", async (event, args) => {
    event.returnValue = await Controllers.PrivateCarAcc.create();
  });

  ipcMain.on("private-car-acc-find-all", async (event, args) => {
    event.returnValue = await Controllers.PrivateCarAcc.findAll();
  });
};

module.exports = init;
