const { ipcRenderer } = window.require("electron");

const findTotalDailyReport = (date) => {
  const data = ipcRenderer.sendSync("daily-report-total-find", { date });
  return data;
};

const findCashDailyReport = (date) => {
  const data = ipcRenderer.sendSync("daily-report-cash-find", { date });
  return data;
};

const findCardDailyReport = (date) => {
  const data = ipcRenderer.sendSync("daily-report-card-find", { date });
  return data;
};

const dailyReport = {
  findTotalDailyReport,
  findCashDailyReport,
  findCardDailyReport,
};

export default dailyReport;
