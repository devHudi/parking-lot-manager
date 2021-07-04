const { ipcRenderer } = window.require("electron");

const importCsv = () => {
  const data = ipcRenderer.sendSync("import-spread-sheet");
  return data;
};

const importDB = () => {
  const data = ipcRenderer.sendSync("import-database");
  return data;
};

const exportDB = () => {
  const data = ipcRenderer.sendSync("export-database");
  return data;
};

const fileDialog = {
  importCsv,
  importDB,
  exportDB,
};

export default fileDialog;
