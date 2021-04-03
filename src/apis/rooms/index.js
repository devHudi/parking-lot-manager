const { ipcRenderer } = window.require("electron");

const create = (id, company, type, areaM, memo) => {
  const data = ipcRenderer.sendSync("room-create", {
    id,
    company,
    type,
    areaM,
    memo,
  });
  return data;
};

const findAll = () => {
  const data = ipcRenderer.sendSync("room-find-all");
  return data;
};

const find = (id) => {
  const data = ipcRenderer.sendSync("room-find-one", {
    id,
  });
  return data;
};

const update = (id, company, type, areaM) => {
  const data = ipcRenderer.sendSync("room-update", {
    id,
    company,
    type,
    areaM,
  });
  return data;
};

const remove = (idList) => {
  const data = ipcRenderer.sendSync("room-remove", {
    idList,
  });
  return data;
};

const getTotalStake = (id) => {
  const data = ipcRenderer.sendSync("room-get-total-stake", {
    id,
  });
  return data;
};

const rooms = {
  create,
  findAll,
  find,
  update,
  remove,
  getTotalStake,
};

export default rooms;
