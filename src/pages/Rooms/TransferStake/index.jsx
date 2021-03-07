import { useState } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";

import { PageTitle, PageTable, Breadcrumb } from "components";

import consts from "consts";

import CreateModal from "./CreateModal";

const columns = [
  {
    title: "보낸 호실",
    dataIndex: "sendRoomId",
  },
  {
    title: "→",
    dataIndex: "arrow",
  },
  {
    title: "받은 호실",
    dataIndex: "receiveRoomId",
  },
  {
    title: "이전 지분",
    dataIndex: "amount",
  },
  {
    title: "일자",
    dataIndex: "createdAt",
    render: (value) => moment(value).format(consts.DATE_FORMAT),
  },
];

const data = [
  {
    sendRoomId: "3423",
    arrow: "→",
    receiveRoomId: "4233",
    amount: 3,
    createdAt: new Date(),
  },
];

const TransferStake = () => {
  const { roomId } = useParams();

  const [modal, setModal] = useState(false);

  return (
    <>
      <CreateModal visible={modal} onClose={() => setModal(false)} />
      <Breadcrumb
        items={[
          { link: "/rooms", text: "호실관리" },
          { link: `/rooms/${roomId}`, text: "호실 자세히 보기" },
          { text: "지분 이전 관리" },
        ]}
      />
      <PageTitle
        title="지분 이전 관리"
        subtitle="잔여 지분에 해당하여 발급되는 무료 주차권을 관리할 수 있습니다."
      />
      <PageTable
        name="지분 이전"
        columns={columns}
        data={data}
        onAddClick={() => setModal(true)}
        onRemoveClick={(selected) => console.log(selected)}
      />
    </>
  );
};

export default TransferStake;
