import { useParams } from "react-router-dom";
import moment from "moment";

import { roomPurchases } from "apis";

import consts from "consts";
import { PageTitle, PageTable, Breadcrumb } from "components";

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
    dataIndex: "purchaseDate",
    render: (value) => moment(value).format(consts.DATE_FORMAT),
  },
  {
    title: "비고",
    dataIndex: "memo",
  },
];

const RoomAccDetails = () => {
  const { roomId } = useParams();

  const data = roomPurchases.findAllByRoomId(roomId);

  return (
    <>
      <Breadcrumb
        items={[
          { link: "/room-accs", text: "호실 수납/부과 관리" },
          { text: "수납기록 조회" },
        ]}
      />
      <PageTitle
        title="수납기록 조회"
        subtitle="호실의 수납 기록을 확인하세요."
      />
      <PageTable
        name="수납기록 조회"
        columns={columns}
        data={data}
        noButtons
        noSelection
      />
    </>
  );
};

export default RoomAccDetails;
