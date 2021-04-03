const { ipcMain } = require("electron");
const Controllers = require("../controllers");

const init = () => {
  ipcMain.on("private-car-find-all", async (event, args) => {
    event.returnValue = await Controllers.PrivateCar.findAll();
  });

  ipcMain.on("private-car-create", async (event, args) => {
    const {
      roomId,
      carNumber,
      carType,
      owner,
      contact,
      memo,
      carRegisterAt,
    } = args;
    event.returnValue = await Controllers.PrivateCar.create(
      roomId,
      carNumber,
      carType,
      owner,
      contact,
      memo,
      carRegisterAt
    );
  });

  ipcMain.on("private-car-find", async (event, args) => {
    const { id } = args;
    event.returnValue = await Controllers.PrivateCar.find(id);
  });

  ipcMain.on("private-car-remove", async (event, args) => {
    const { idList } = args;
    event.returnValue = await Controllers.PrivateCar.remove(idList);
  });

  ipcMain.on("private-car-update", async (event, args) => {
    const {
      id,
      roomId,
      owner,
      contact,
      carNumber,
      carType,
      carRegisterAt,
    } = args;

    event.returnValue = await Controllers.PrivateCar.update(
      id,
      roomId,
      owner,
      contact,
      carNumber,
      carType,
      carRegisterAt
    );
  });
};

module.exports = init;
