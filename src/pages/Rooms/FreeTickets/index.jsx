import { useState } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";

import { Button } from "antd";
import { PageTitle, PageTable, Breadcrumb } from "components";

import { freeTickets } from "apis";
import consts from "consts";

import { useForceUpdate } from "hooks";

import CreateFreeTicketModal from "./CreateFreeTicketModal";
import UseFreeTicketModal from "./UseFreeTicketModal";

const columns = [
  {
    title: "수령/사용",
    dataIndex: "type",
    render: (value) => (value === "GET" ? "수령" : "사용"),
  },
  {
    title: "수량",
    dataIndex: "amount",
  },
  {
    title: "일자",
    dataIndex: "createdAt",
    render: (value) => moment(value).format(consts.DATE_FORMAT),
  },
];

const FreeTickets = () => {
  const { roomId } = useParams();

  const [createModal, setCreateModal] = useState(false);
  const [useModal, setUseModal] = useState(false);

  const forceUpdate = useForceUpdate();

  const handleRemove = (selected) => {
    const idList = selected.map((row) => row.id);
    freeTickets.remove(idList);
    forceUpdate();
  };

  const data = freeTickets.findAllByRoomId(roomId);

  return (
    <>
      <CreateFreeTicketModal
        visible={createModal}
        roomId={roomId}
        onClose={() => setCreateModal(false)}
      />
      <UseFreeTicketModal
        visible={useModal}
        roomId={roomId}
        onClose={() => setUseModal(false)}
      />
      <Breadcrumb
        items={[
          { link: "/rooms", text: "호실관리" },
          { link: `/rooms/${roomId}`, text: "호실 자세히 보기" },
          { text: "무료 추차권 관리" },
        ]}
      />
      <PageTitle
        title="무료 주차권 관리"
        subtitle="잔여 지분에 해당하여 발급되는 무료 주차권을 관리할 수 있습니다."
      />
      <PageTable
        name="주차권"
        columns={columns}
        data={data}
        onAddClick={() => setCreateModal(true)}
        onRemoveClick={handleRemove}
      >
        <Button onClick={() => setUseModal(true)}>주차권 사용 처리</Button>
      </PageTable>
    </>
  );
};

export default FreeTickets;
