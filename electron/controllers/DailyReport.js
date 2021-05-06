const moment = require("moment");
const Op = require("sequelize").Op;

const PaidTicket = require("../models/PaidTicket");
const RoomPurchase = require("../models/RoomPurchase");
const PrivateCarPurchase = require("../models/PrivateCarPurchase");

const calc = require("../utils/calc");

const getDetailReport = async (date, payMethod) => {
  const paidTickets = (
    await PaidTicket.findAll({
      where: {
        soldDate: {
          [Op.between]: [
            moment(date).startOf("day"),
            moment(date).endOf("day"),
          ],
        },
        payMethod,
      },
    })
  ).map((row) => {
    //TODO: paidTicket 구조 바뀌면 제대로 표시해야함 (시간당 가격, 티켓 수량, 호실 등)
    const {
      bank,
      depositor,
      period,
      isRnE,
      RCM,
      memo,
      payMethod,
    } = row.dataValues;
    let ticket = 0;
    let text = "";
    if (period === "30M") {
      ticket = 1;
      text = "30분";
    } else if (period === "1H") {
      ticket = 2;
      text = "1시간";
    } else if (period === "1D") {
      ticket = 3;
      text = "1일";
    }

    return {
      type: "paidTicket",
      bank,
      content: `${text}권 * ???`,
      depositor,
      ticket,
      isRnE,
      RCM,
      memo,
      payMethod,
    };
  });

  const roomPurchases = (
    await RoomPurchase.findAll({
      where: {
        purchaseDate: {
          [Op.between]: [
            moment(date).startOf("day"),
            moment(date).endOf("day"),
          ],
        },
        payMethod,
      },
    })
  ).map((row) => {
    const {
      id,
      bank,
      depositor,
      amount,
      isRnE,
      RCM,
      memo,
      payMethod,
    } = row.dataValues;

    return {
      type: "room",
      room: id,
      bank,
      content: `호실차량 (${id}호)`,
      depositor,
      monthly: amount,
      isRnE,
      RCM,
      memo,
      payMethod,
    };
  });

  const privateCarPurchases = (
    await PrivateCarPurchase.findAll({
      where: {
        purchaseDate: {
          [Op.between]: [
            moment(date).startOf("day"),
            moment(date).endOf("day"),
          ],
        },
        payMethod,
      },
    })
  ).map((row) => {
    const {
      bank,
      privateCarId,
      depositor,
      amount,
      isRnE,
      RCM,
      memo,
      payMethod,
    } = row.dataValues;

    return {
      type: "privateCar",
      bank,
      content: `개인차량 (${privateCarId})`,
      depositor,
      monthly: amount,
      isRnE,
      RCM,
      memo,
      payMethod,
    };
  });

  return [...paidTickets, ...roomPurchases, ...privateCarPurchases];
};

exports.findTotalDailyReport = async (date) => {
  const report = await getDetailReport(date, {
    [Op.or]: ["cash", "card"],
  });

  const paidTickets = report.filter((row) => row.type === "paidTicket");
  const monthly = report.filter((row) => row.type !== "paidTicket");

  const paidTicketsCash = paidTickets
    .filter((row) => row.payMethod === "cash")
    .reduce((acc, cur) => {
      return acc + cur.ticket;
    }, 0);
  const paidTicketsCard = paidTickets
    .filter((row) => row.payMethod === "card")
    .reduce((acc, cur) => {
      return acc + cur.ticket;
    }, 0);

  const monthlyCash = monthly
    .filter((row) => row.payMethod === "cash")
    .reduce((acc, cur) => {
      return acc + cur.monthly;
    }, 0);
  const monthlyCard = monthly
    .filter((row) => row.payMethod === "card")
    .reduce((acc, cur) => {
      return acc + cur.monthly;
    }, 0);

  return [
    {
      type: "주차권",
      cash: paidTicketsCash,
      card: paidTicketsCard,
      total: paidTicketsCash + paidTicketsCard,
    },
    {
      type: "월주차(차량)",
      cash: monthlyCash,
      card: monthlyCard,
      total: monthlyCash + monthlyCard,
    },
  ];
};

exports.findCashDailyReport = async (date) => {
  return await getDetailReport(date, "cash");
};

exports.findCardDailyReport = async (date) => {
  const a = await getDetailReport(date, "card");
  return a;
};
