import { useState, useEffect } from "react";
import { DatePicker } from "antd";
import moment from "moment";

import { PageTitle, PageTable } from "components";
import consts from "consts";

import { useForceUpdate } from "hooks";

import { paidTickets } from "apis";

import CreateModal from "./CreateModal";

const columns = [
  {
    title: "호실",
    dataIndex: "roomId",
  },
  {
    title: "주차권",
    dataIndex: "period",
    render: (value) => {
      if (value === "FREE") return "무료주차";
      else if (value === "30M") return "30분권";
      else if (value === "1H") return "1시간권";
      else if (value === "1D") return "1일권";
      else if (value === "WORK") return "공사차량";
    },
  },
  {
    title: "개수",
    dataIndex: "amount",
  },
  {
    title: "결제 수단",
    dataIndex: "payMethod",
    render: (value) => (value === "card" ? "카드" : "현금"),
  },
  {
    title: "입금자",
    dataIndex: "depositor",
  },
  {
    title: "수납 은행 (카드사)",
    dataIndex: "bank",
  },
  {
    title: "결제 수단",
    dataIndex: "payMethod",
    render: (value) => (value === "cash" ? "현금" : "카드"),
  },
  {
    title: "세계",
    dataIndex: "isRnE",
    render: (value) => (value ? "O" : "X"),
  },
  {
    title: "판매 일자",
    dataIndex: "soldDate",
    render: (value) => moment(value).format(consts.DATE_FORMAT),
  },
  {
    title: "지출 증빙",
    dataIndex: "proof",
    render: (value) => {
      if (value === "taxBill") return "세금계산서";
      else if (value === "cashReceipt") return "현금영수증";
      else return "기타";
    },
  },
  {
    title: "비고",
    dataIndex: "memo",
  },
];

const PaidTickets = () => {
  const [modal, setModal] = useState(false);

  const [startDate, setStartDate] = useState(
    moment(moment().subtract(1, "months"), consts.DATE_FORMAT).toDate()
  );
  const [endDate, setEndDate] = useState(
    moment(new Date(), consts.DATE_FORMAT).endOf("day").toDate()
  );

  const forceUpdate = useForceUpdate();

  const data = paidTickets.findAll(startDate, endDate);

  const handleRemove = (selected) => {
    const idList = selected.map((row) => row.id);
    paidTickets.remove(idList);
    forceUpdate();
  };

  return (
    <>
      <CreateModal visible={modal} onClose={() => setModal(false)} />
      <PageTitle
        title="주차권 판매 관리"
        subtitle="외부 공사차량 등에 판매하는 주차권을 관리할 수 있습니다."
      />
      <PageTable
        name="주차권"
        columns={columns}
        data={data}
        onAddClick={() => setModal(true)}
        onRemoveClick={handleRemove}
      >
        <DatePicker.RangePicker
          placeholder={["시작 날짜", "마지막 날짜"]}
          defaultValue={[moment(startDate), moment(endDate)]}
          onChange={(dates) => {
            setStartDate(dates[0].toDate());
            setEndDate(dates[1].toDate());
          }}
        />
      </PageTable>
    </>
  );
};

export default PaidTickets;
