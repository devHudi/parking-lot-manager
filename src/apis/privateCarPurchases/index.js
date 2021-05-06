const { ipcRenderer } = window.require("electron");

const create = (
  privateCarId,
  payMethod,
  bank,
  amount,
  fake,
  purchaseDate,
  isRnE,
  RCM,
  memo
) => {
  const data = ipcRenderer.sendSync("private-car-purchase-create", {
    privateCarId,
    payMethod,
    bank,
    amount,
    fake,
    purchaseDate,
    isRnE,
    RCM,
    memo,
  });
  return data;
};

const findAllByPrivateCarId = (privateCarId) => {
  const data = ipcRenderer.sendSync(
    "private-car-purchase-find-all-by-private-car-id",
    {
      privateCarId,
    }
  );
  return data;
};

const findAllByDate = (year, month) => {
  const data = ipcRenderer.sendSync("private-car-purchase-find-all-by-date", {
    year,
    month,
  });
  return data;
};

const roomPurchases = {
  create,
  findAllByPrivateCarId,
  findAllByDate,
};

export default roomPurchases;
