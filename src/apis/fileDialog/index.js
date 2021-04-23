const { ipcRenderer } = window.require("electron");

const importCsv = () => {
  const data = ipcRenderer.sendSync("import-spread-sheet");
  return data;
};

const fileDialog = {
  importCsv,
};

export default fileDialog;
