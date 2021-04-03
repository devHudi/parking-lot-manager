const { ipcRenderer } = window.require("electron");

const create = (
  carNumber,
  carType,
  owner,
  contact,
  payMethod,
  period,
  soldDate,
  parkingDate,
  memo
) => {
  const data = ipcRenderer.sendSync("paid-ticket-create", {
    carNumber,
    carType,
    owner,
    contact,
    payMethod,
    period,
    soldDate,
    parkingDate,
    memo,
  });
  return data;
};

const findAll = (startDate, endDate) => {
  const data = ipcRenderer.sendSync("paid-ticket-find-all", {
    startDate,
    endDate,
  });
  return data;
};

const remove = (idList) => {
  const data = ipcRenderer.sendSync("paid-ticket-remove", {
    idList,
  });
  return data;
};

const paidTickets = {
  create,
  findAll,
  remove,
};

export default paidTickets;