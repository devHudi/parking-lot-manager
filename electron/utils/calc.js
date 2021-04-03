const _ = require("lodash");

const m2p = (m) => {
  return _.round(m / 3.306, 2);
};

const p2m = (p) => {
  return _.round(p * 3.306, 2);
};

const stake = (m, type = "work") => {
  const p = m2p(m);
  const standard = type === "work" ? 45.77 : 31.76;

  return _.round(p / standard, 2);
};

module.exports = {
  m2p,
  p2m,
  stake,
};
