const { ipcMain, dialog } = require("electron");
const fs = require("fs");
const parse = require("csv-parse/lib/sync");

const Controllers = require("../controllers");

const init = () => {
  ipcMain.on("import-spread-sheet", async (event, args) => {
    const filePath = dialog.showOpenDialogSync({ properties: ["openFile"] });

    if (filePath.length > 0) {
      const rawData = fs.readFileSync(filePath[0]);

      const parsedData = parse(rawData.toString("utf-8"), {
        skip_empty_lines: true,
      });

      event.returnValue = await Controllers.Room.importCsv(parsedData);
    }
  });
};

module.exports = init;
