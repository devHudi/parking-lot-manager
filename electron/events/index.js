const db = require("../db");

const room = require("./room");
const stakeTransfer = require("./stakeTransfer");
const car = require("./car");
const privateCar = require("./privateCar");
const paidTicket = require("./paidTicket");
const freeTicket = require("./freeTicket");
const roomAcc = require("./roomAcc");
const roomPurchase = require("./roomPurchase");
const privateCarAcc = require("./privateCarAcc");
const privateCarPurchase = require("./privateCarPurchase");

const init = () => {
  db.connect();

  room();
  stakeTransfer();
  car();
  privateCar();
  paidTicket();
  freeTicket();
  roomAcc();
  roomPurchase();
  privateCarAcc();
  privateCarPurchase();
};

module.exports = { init };
