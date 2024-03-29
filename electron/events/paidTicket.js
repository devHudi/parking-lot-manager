const { ipcMain } = require("electron");
const Controllers = require("../controllers");

const init = () => {
  ipcMain.on("paid-ticket-create", async (event, args) => {
    const {
      roomId,
      payMethod,
      depositor,
      proof,
      bank,
      period,
      amount,
      soldDate,
      isRnE,
      RCM,
      memo,
    } = args;

    event.returnValue = await Controllers.PaidTicket.create(
      roomId,
      payMethod,
      depositor,
      bank,
      period,
      amount,
      proof,
      soldDate,
      isRnE,
      RCM,
      memo
    );
  });

  ipcMain.on("paid-ticket-find-all", async (event, args) => {
    const { startDate, endDate } = args;

    if (!startDate || !endDate) {
      event.returnValue = await Controllers.PaidTicket.findAll();
    } else {
      event.returnValue = await Controllers.PaidTicket.findAllByDate(
        startDate,
        endDate
      );
    }
  });

  ipcMain.on("paid-ticket-remove", async (event, args) => {
    const { idList } = args;
    event.returnValue = await Controllers.PaidTicket.remove(idList);
  });
};

module.exports = init;
