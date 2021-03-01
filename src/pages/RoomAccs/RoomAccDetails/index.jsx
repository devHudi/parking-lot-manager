import moment from "moment";

import { PageTitle, PageTable } from "components";
import consts from "consts";

const columns = [
  {
    title: "수납 금액",
    dataIndex: "amount",
  },
  {
    title: "수납 은행",
    dataIndex: "bank",
  },
  {
    title: "가수납 여부",
    dataIndex: "fake",
    render: (value) => (value ? "O" : "X"),
  },
  {
    title: "날짜",
    dataIndex: "date",
    render: (value) => moment(value).format(consts.DATE_FORMAT),
  },
  {
    title: "비고",
    dataIndex: "memo",
  },
];

const RoomAccDetails = () => {
  const data = [
    {
      amount: 3000,
      bank: "우리은행",
      fake: false,
      date: new Date(),
      memo: "메모입니다",
    },
  ];

  return (
    <>
      <PageTitle
        title="호실 수납 기록"
        subtitle="호실의 수납 기록을 확인하세요."
      />
      <PageTable name="개인 차량" columns={columns} data={data} noButtons />
    </>
  );
};

export default RoomAccDetails;
