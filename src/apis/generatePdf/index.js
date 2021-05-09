const { ipcRenderer } = window.require("electron");

const generate = (
  room,
  amount,
  startDate,
  endDate,
  deadlineDate,
  carNumber = false
) => {
  const data = ipcRenderer.sendSync("generate-pdf", {
    room,
    amount,
    startDate,
    endDate,
    deadlineDate,
    carNumber,
  });
  return data;
};

const generatePdf = {
  generate,
};

export default generatePdf;
