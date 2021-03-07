const db = require("../db");

const room = require("./room");

const init = () => {
  db.connect();
  room();
};

module.exports = { init };
