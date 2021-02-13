import { DatePicker } from "antd";

import { PageTitle, PageTable } from "components";

const columns = [
  {
    title: "차량번호",
    dataIndex: "car_number",
  },
  {
    title: "차종",
    dataIndex: "car_type",
  },
  {
    title: "차주",
    dataIndex: "owner",
  },
  {
    title: "연락처",
    dataIndex: "contact",
  },
  {
    title: "주차 날짜",
    dataIndex: "date",
  },
  {
    title: "시간",
    dataIndex: "term",
  },
  {
    title: "결제 방법",
    dataIndex: "pay_method",
  },
  {
    title: "비고",
    dataIndex: "memo",
  },
];

const data = [
  {
    car_number: "1234",
    car_type: "OOO",
    owner: "김OO",
    contact: "01000000000",
    date: "0000-00-00",
    term: "30분",
    pay_method: "현금",
    memo: "",
  },
];

const PaidTickets = () => {
  return (
    <>
      <PageTitle
        title="주차권 판매 관리"
        subtitle="외부 공사차량 등에 판매하는 주차권을 관리할 수 있습니다."
      />
      <PageTable
        name="주차권"
        columns={columns}
        data={data}
        onAddClick={() => alert("추가")}
        onRemoveClick={(selected) => console.log(selected)}
      >
        <DatePicker.RangePicker placeholder={["시작 날짜", "마지막 날짜"]} />
      </PageTable>
    </>
  );
};

export default PaidTickets;
