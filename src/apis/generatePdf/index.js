const { ipcRenderer } = window.require("electron");

const generate = (room, amount, startDate, endDate, deadlineDate) => {
  const data = ipcRenderer.sendSync("generate-pdf", {
    room,
    amount,
    startDate,
    endDate,
    deadlineDate,
  });
  return data;
};

const generatePdf = {
  generate,
};

export default generatePdf;
