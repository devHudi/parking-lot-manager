import { useState } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";

import { cars } from "apis";

import { PageTitle, PageTable, Breadcrumb } from "components";

import consts from "consts";

import CreateModal from "./CreateModal";

const columns = [
  {
    title: "차 번호",
    dataIndex: "carNumber",
  },
  {
    title: "차 종",
    dataIndex: "carType",
  },
  {
    title: "차 주인",
    dataIndex: "owner",
  },
  {
    title: "차주 연락처",
    dataIndex: "contact",
  },
  {
    title: "무료",
    dataIndex: "isFree",
    render: (value) => (value ? "예" : "아니오"),
  },
  {
    title: "메모",
    dataIndex: "memo",
  },
  {
    title: "생성일자",
    dataIndex: "createdAt",
    render: (value) => moment(value).format(consts.DATE_FORMAT),
  },
];

const Cars = () => {
  const { roomId } = useParams();

  const [modal, setModal] = useState(false);

  const handleRemove = (selected) => {
    const idList = selected.map((row) => row.id);
    cars.remove(idList);
  };

  console.log({ roomId });
  const data = cars.findAllByRoomId(roomId);

  console.log(data);

  return (
    <>
      <CreateModal
        visible={modal}
        roomId={roomId}
        onClose={() => setModal(false)}
      />
      <Breadcrumb
        items={[
          { link: "/rooms", text: "호실관리" },
          { link: `/rooms/${roomId}`, text: "호실 자세히 보기" },
          { text: "호실 차량 관리" },
        ]}
      />
      <PageTitle
        title={`${roomId} 호실 차량 관리`}
        subtitle="호실에 등록된 차량을 관리할 수 있습니다."
      />
      <PageTable
        name="호실 차량"
        columns={columns}
        data={data}
        onAddClick={() => setModal(true)}
        onRemoveClick={handleRemove}
      />
    </>
  );
};

export default Cars;
