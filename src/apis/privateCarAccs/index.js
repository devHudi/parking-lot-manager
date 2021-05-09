const { ipcRenderer } = window.require("electron");

const create = (year, month) => {
  const data = ipcRenderer.sendSync("private-car-acc-create", { year, month });
  return data;
};

const findAll = () => {
  const data = ipcRenderer.sendSync("private-car-acc-find-all");
  return data;
};

const privateCarAccs = {
  create,
  findAll,
};

export default privateCarAccs;
