import { useState } from "react";

import { Button, Input, Select, Modal } from "antd";
import { ExclamationCircleOutlined, BarcodeOutlined } from "@ant-design/icons";

import { PageTitle, PageTable } from "components";

import CreateRoomModal from "./CreateRoomModal";

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
    dataIndex: "area_m",
  },
  {
    title: "면적 (평)",
    dataIndex: "area_p",
  },
  {
    title: "지분",
    dataIndex: "stake",
  },
  {
    title: "무료 차량",
    dataIndex: "free_cars",
    render: (arr) => arr.join(", "),
  },
  {
    title: "유료 차량",
    dataIndex: "paid_cars",
    render: (arr) => arr.join(", "),
  },
  {
    title: "초과 대수",
    dataIndex: "excess_amount",
  },
  {
    title: "총 대수",
    dataIndex: "total_amount",
  },
  {
    title: "무료 주차권",
    dataIndex: "free_tickets",
  },
  {
    title: "비고",
    dataIndex: "memo",
  },
];

const data = [
  {
    key: "1",
    id: "301",
    company: "OO상사",
    area_m: 44.84,
    area_p: 13.56,
    stake: 0.3,
    free_cars: ["3432", "4323", "2342"],
    paid_cars: ["8134", "8135"],
    excess_amount: 2,
    total_amount: 5,
    free_tickets: 55,
    memo: "테스트 호실",
  },
];

const Rooms = () => {
  const [modal, setModal] = useState(false);
  const [searchMethod, setSearchMethod] = useState("room");

  const showConfirm = () => {
    Modal.confirm({
      title: "무료 주차권 지급 경고",
      icon: <ExclamationCircleOutlined />,
      content:
        "무료 주차권 지급은 현재 기준의 지분과 차량현황을 기준으로 지급됩니다. 반드시 모든 호실의 지분 및 차량 업무를 마친 다음 실행하시기 바랍니다. 본 작업은 모든 작업이 마무리된 월말에 실행하는 것을 권장드립니다.",
      onOk() {
        console.log("확인");
      },
      onCancel() {
        console.log("취소");
      },
    });
  };

  return (
    <>
      <CreateRoomModal visible={modal} onClose={() => setModal(false)} />
      <PageTitle
        title="호실관리"
        subtitle="전체 호실을 조회하고 관리할 수 있습니다."
      />
      <PageTable
        name="호실"
        columns={columns}
        data={data}
        onAddClick={() => setModal(true)}
        onRemoveClick={(selected) => console.log(selected)}
      >
        <Button type="primary" icon={<BarcodeOutlined />} onClick={showConfirm}>
          금월 주차권 지급
        </Button>
        <Select
          defaultValue="room"
          onChange={(value) => setSearchMethod(value)}
        >
          <Select.Option value="room">호실로 검색</Select.Option>
          <Select.Option value="company">입주사로 검색</Select.Option>
        </Select>
        <Input.Search
          placeholder="검색어"
          allowClear
          enterButton
          onSearch={(value) => console.log({ searchMethod, value })}
        />
      </PageTable>
    </>
  );
};

export default Rooms;
