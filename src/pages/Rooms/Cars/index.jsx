import { useState } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";

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
    title: "메모",
    dataIndex: "memo",
  },
  {
    title: "생성일자",
    dataIndex: "createdAt",
    render: (value) => moment(value).format(consts.DATE_FORMAT),
  },
];

const data = [
  {
    carNumber: "2342 바",
    carType: "벤츠",
    owner: "조동현",
    contact: "0303030303",
    memo: "메모",
    createdAt: new Date(),
  },
];

const Cars = () => {
  const { roomId } = useParams();

  const [modal, setModal] = useState(false);

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
        onRemoveClick={(selected) => console.log(selected)}
      />
    </>
  );
};

export default Cars;
