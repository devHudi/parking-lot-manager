const { ipcMain } = require("electron");
const Controllers = require("../controllers");

const init = () => {
  ipcMain.on("room-create", async (event, args) => {
    const { id, company, type, areaM, memo } = args;
    event.returnValue = await Controllers.Room.create(
      id,
      company,
      type,
      areaM,
      memo
    );
  });

  ipcMain.on("room-find-all", async (event, args) => {
    event.returnValue = await Controllers.Room.findAll();
  });

  ipcMain.on("room-find-one", async (event, args) => {
    const { id } = args;
    event.returnValue = await Controllers.Room.find(id);
  });

  ipcMain.on("room-update", async (event, args) => {
    const { id, company, type, areaM } = args;
    event.returnValue = await Controllers.Room.update(id, company, type, areaM);
  });

  ipcMain.on("room-remove", async (event, args) => {
    const { idList } = args;
    event.returnValue = await Controllers.Room.remove(idList);
  });

  ipcMain.on("room-get-total-stake", async (event, args) => {
    const { id } = args;
    event.returnValue = await Controllers.Room.getTotalStake(id);
  });

  ipcMain.on("room-get-acc-table", async (event, args) => {
    const { year, month } = args;
    event.returnValue = await Controllers.Room.getAccTable(year, month);
  });

  ipcMain.on("room-is-exists", async (event, args) => {
    const { id } = args;
    event.returnValue = await Controllers.Room.isExists(id);
  });
};

module.exports = init;
