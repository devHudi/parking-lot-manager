const { ipcMain, dialog } = require("electron");
const fs = require("fs");
const parse = require("csv-parse/lib/sync");

const Controllers = require("../controllers");

const init = () => {
  ipcMain.on("import-spread-sheet", async (event, args) => {
    const filePath = dialog.showOpenDialogSync({ properties: ["openFile"] });

    if (filePath !== undefined) {
      const rawData = fs.readFileSync(filePath[0]);

      const parsedData = parse(rawData.toString("utf-8"), {
        skip_empty_lines: true,
      });

      event.returnValue = await Controllers.Room.importCsv(parsedData);
    }
    event.returnValue = null;
  });

  ipcMain.on("import-database", async (event, args) => {
    const filePath = dialog.showOpenDialogSync({
      properties: ["openFile"],
    });
    if (filePath !== undefined) {
      fs.copyFileSync(filePath[0], "database.sqlite");
    }

    event.returnValue = null;
  });

  ipcMain.on("export-database", async (event, args) => {
    const dirPath = dialog.showOpenDialogSync({
      properties: ["openDirectory"],
    });
    if (dirPath !== undefined) {
      fs.copyFileSync("database.sqlite", dirPath[0] + "/database.sqlite");
    }

    event.returnValue = null;
  });
};

module.exports = init;
