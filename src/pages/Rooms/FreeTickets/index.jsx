import { useState } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";

import { Button } from "antd";
import { PageTitle, PageTable, Breadcrumb } from "components";

import consts from "consts";

import CreateFreeTicketModal from "./CreateFreeTicketModal";
import UseFreeTicketModal from "./UseFreeTicketModal";

const columns = [
  {
    title: "수령/사용",
    dataIndex: "type",
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

const data = [
  {
    type: "수령",
    amount: 3,
    createdAt: new Date(),
  },
];

const FreeTickets = () => {
  const { roomId } = useParams();

  const [createModal, setCreateModal] = useState(false);
  const [useModal, setUseModal] = useState(false);

  return (
    <>
      <CreateFreeTicketModal
        visible={createModal}
        onClose={() => setCreateModal(false)}
      />
      <UseFreeTicketModal
        visible={useModal}
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
        onRemoveClick={(selected) => console.log(selected)}
      >
        <Button onClick={() => setUseModal(true)}>주차권 사용 처리</Button>
      </PageTable>
    </>
  );
};

export default FreeTickets;
