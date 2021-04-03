const { ipcMain } = require("electron");
const Controllers = require("../controllers");

const init = () => {
  ipcMain.on("car-find-all-by-room", async (event, args) => {
    const { roomId } = args;
    event.returnValue = await Controllers.Car.findAllByRoomId(roomId);
  });

  ipcMain.on("car-create", async (event, args) => {
    const { roomId, carNumber, carType, owner, contact, memo } = args;
    event.returnValue = await Controllers.Car.create(
      roomId,
      carNumber,
      carType,
      owner,
      contact,
      memo
    );
  });

  ipcMain.on("car-remove", async (event, args) => {
    const { idList } = args;
    event.returnValue = await Controllers.Car.remove(idList);
  });
};

module.exports = init;
