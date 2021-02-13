import { useState } from "react";

import { Button, Input, Select } from "antd";

import { PageTitle, PageTable } from "components";

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
  const [searchMethod, setSearchMethod] = useState("room");

  return (
    <>
      <PageTitle
        title="호실관리"
        subtitle="전체 호실을 조회하고 관리할 수 있습니다."
      />
      <PageTable
        name="호실"
        columns={columns}
        data={data}
        onAddClick={() => alert("추가")}
        onRemoveClick={(selected) => console.log(selected)}
      >
        <Button type="primary"> 이번달 주차권 지급</Button>
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
