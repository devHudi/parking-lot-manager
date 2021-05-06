const { ipcMain } = require("electron");
const Controllers = require("../controllers");

const init = () => {
  ipcMain.on("daily-report-total-find", async (event, args) => {
    const { date } = args;
    event.returnValue = await Controllers.DailyReport.findTotalDailyReport(
      date
    );
  });

  ipcMain.on("daily-report-cash-find", async (event, args) => {
    const { date } = args;
    event.returnValue = await Controllers.DailyReport.findCashDailyReport(date);
  });

  ipcMain.on("daily-report-card-find", async (event, args) => {
    const { date } = args;
    event.returnValue = await Controllers.DailyReport.findCardDailyReport(date);
  });
};

module.exports = init;
