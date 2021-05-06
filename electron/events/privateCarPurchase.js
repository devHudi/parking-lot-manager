const { ipcMain } = require("electron");
const Controllers = require("../controllers");

const init = () => {
  ipcMain.on("private-car-purchase-create", async (event, args) => {
    const {
      privateCarId,
      payMethod,
      depositor,
      bank,
      amount,
      fake,
      purchaseDate,
      isRnE,
      RCM,
      memo,
    } = args;
    event.returnValue = await Controllers.PrivateCarPurchase.create(
      privateCarId,
      payMethod,
      depositor,
      bank,
      amount,
      fake,
      purchaseDate,
      isRnE,
      RCM,
      memo
    );
  });

  ipcMain.on(
    "private-car-purchase-find-all-by-private-car-id",
    async (event, args) => {
      const { privateCarId } = args;
      event.returnValue = await Controllers.PrivateCarPurchase.findAllByPrivateCarId(
        privateCarId
      );
    }
  );

  ipcMain.on("private-car-purchase-find-all-by-date", async (event, args) => {
    const { year, month } = args;
    event.returnValue = await Controllers.PrivateCarPurchase.findAllByDate(
      year,
      month
    );
  });
};

module.exports = init;
