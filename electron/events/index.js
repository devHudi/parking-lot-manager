const db = require("../db");

const room = require("./room");
const stakeTransfer = require("./stakeTransfer");
const car = require("./car");
const privateCar = require("./privateCar");
const paidTicket = require("./paidTicket");

const init = () => {
  db.connect();

  room();
  stakeTransfer();
  car();
  privateCar();
  paidTicket();
};

module.exports = { init };
