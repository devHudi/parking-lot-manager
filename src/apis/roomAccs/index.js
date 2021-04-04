const { ipcRenderer } = window.require("electron");

const create = () => {
  const data = ipcRenderer.sendSync("room-acc-create");
  return data;
};

const findAll = () => {
  const data = ipcRenderer.sendSync("room-acc-find-all");
  return data;
};

const roomAccs = {
  create,
  findAll,
};

export default roomAccs;
