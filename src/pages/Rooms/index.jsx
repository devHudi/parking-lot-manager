import { useState } from "react";
import { useHistory } from "react-router-dom";

import { Button, Input, Select, Modal } from "antd";
import { ExclamationCircleOutlined, BarcodeOutlined } from "@ant-design/icons";

import { PageTitle, PageTable } from "components";

import { rooms, freeTickets } from "apis";

import { useForceUpdate } from "hooks";

import CreateModal from "./CreateModal";

const columns = [
  {
    title: "호실",
    dataIndex: "id",
  },
  {
    title: "입주사",
    dataIndex: "company",
  },
  {
    title: "면적 (㎡)",
    dataIndex: "areaM",
  },
  {
    title: "면적 (평)",
    dataIndex: "areaP",
  },
  {
    title: "기본지분",
    dataIndex: "defaultStake",
  },
  {
    title: "현재지분",
    dataIndex: "totalStake",
  },
  {
    title: "무료 차량",
    dataIndex: "freeCars",
    render: (arr) => arr.map((car) => car.carNumber).join(", "),
  },
  {
    title: "유료 차량",
    dataIndex: "paidCars",
    render: (arr) => arr.map((car) => car.carNumber).join(", "),
  },
  {
    title: "초과 대수",
    dataIndex: "excessAmount",
  },
  {
    title: "총 대수",
    dataIndex: "totalAmount",
  },
  {
    title: "무료 주차권",
    dataIndex: "freeTickets",
  },
  {
    title: "비고",
    dataIndex: "memo",
  },
];

const Rooms = () => {
  const [modal, setModal] = useState(false);
  const [searchMethod, setSearchMethod] = useState("id");
  const [searchKeyword, setSearchKeyword] = useState("");

  const forceUpdate = useForceUpdate();

  const history = useHistory();

  const showConfirm = () => {
    Modal.confirm({
      title: "무료 주차권 지급 경고",
      icon: <ExclamationCircleOutlined />,
      content:
        "무료 주차권 지급은 현재 기준의 지분과 차량현황을 기준으로 지급됩니다. 반드시 모든 호실의 지분 및 차량 업무를 마친 다음 실행하시기 바랍니다. 본 작업은 모든 작업이 마무리된 월말에 실행하는 것을 권장드립니다.",
      onOk() {
        freeTickets.monthlyGiving();
        forceUpdate();
        alert("금월 주차권이 잔여 지분에 따라 지급되었습니다.");
      },
    });
  };

  const handleRemove = (selected) => {
    if (
      window.confirm(
        "선택한 항목을 정말로 삭제할까요? 호실과 관련된 정보 (지분이전, 차량, 부과/수납 등) 이 모두 사라집니다."
      )
    ) {
      const idList = selected.map((row) => row.id);
      rooms.remove(idList);
      forceUpdate();
      alert("삭제되었습니다.");
    }
  };

  const data = rooms.findAll();

  const filteredData =
    searchKeyword === ""
      ? data
      : data.filter((row) => {
          return row[searchMethod].indexOf(searchKeyword) !== -1;
        });

  return (
    <>
      <CreateModal visible={modal} onClose={() => setModal(false)} />
      <PageTitle
        title="호실관리"
        subtitle="전체 호실을 조회하고 관리할 수 있습니다."
      />
      <PageTable
        name="호실"
        columns={columns}
        data={filteredData}
        onAddClick={() => setModal(true)}
        onRemoveClick={handleRemove}
        onRowClick={(data) => history.push(`/rooms/${data.id}`)}
      >
        <Button type="primary" icon={<BarcodeOutlined />} onClick={showConfirm}>
          금월 주차권 지급
        </Button>
      </PageTable>
    </>
  );
};

export default Rooms;
