const { ipcMain, dialog } = require("electron");
const fs = require("fs");
const path = require("path");
const moment = require("moment");
const pdf = require("pdf-creator-node");

const init = () => {
  ipcMain.on("generate-pdf", async (event, args) => {
    const { room, amount, startDate, endDate, deadlineDate } = args;

    let dirPath = dialog.showOpenDialogSync({
      properties: ["openDirectory"],
    });

    if (!dirPath) {
      event.returnValue = false;
      return;
    }

    dirPath = dirPath[0];

    const html = fs.readFileSync(
      path.resolve("electron/templates/paymentGuide.html"),
      "utf8"
    );

    const options = {
      format: "A4",
      orientation: "portrait",
      border: "10mm",
    };

    const document = {
      html: html,
      data: {
        room,
        amount: amount.toString(),
        startDate: moment(startDate).format("YYYY년 MM월 DD일"),
        endDate: moment(endDate).format("YYYY년 MM월 DD일"),
        deadlineDate: moment(deadlineDate).format("YYYY년 MM월 DD일"),
      },
      path: path.join(dirPath, `./${room}호 납부안내서.pdf`),
      type: "",
    };

    pdf
      .create(document, options)
      .then((res) => {
        console.log(res);
        event.returnValue = true;
      })
      .catch((error) => {
        console.error(error);
        event.returnValue = false;
      });
  });
};

module.exports = init;
