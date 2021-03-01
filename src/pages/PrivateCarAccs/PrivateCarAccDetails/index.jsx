import moment from "moment";

import { PageTitle, PageTable, Breadcrumb } from "components";
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

const PrivateCarAccDetails = () => {
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
      <Breadcrumb
        items={[
          { link: "/private-car-accs", text: "개인차량 수납/부과 관리" },
          { text: "개인차량 수납기록 조회" },
        ]}
      />
      <PageTitle
        title="개인차량 수납기록 조회"
        subtitle="개인차량의 수납 기록을 확인하세요."
      />
      <PageTable
        name="개인차량 수납기록 조회"
        columns={columns}
        data={data}
        noButtons
      />
    </>
  );
};

export default PrivateCarAccDetails;
