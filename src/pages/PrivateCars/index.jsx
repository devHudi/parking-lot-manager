import { useState } from "react";

import { Button, Input, Select } from "antd";

import { PageTitle, PageTable } from "components";

const columns = [
  {
    title: "호실",
    dataIndex: "room",
  },
  {
    title: "입주사",
    dataIndex: "company",
  },
  {
    title: "성명",
    dataIndex: "owner",
  },
  {
    title: "연락처",
    dataIndex: "contact",
  },
  {
    title: "차종",
    dataIndex: "car_type",
  },
  {
    title: "월정금액",
    dataIndex: "monthly_amount",
  },
  {
    title: "등록일",
    dataIndex: "created_at",
  },
];

const data = [
  {
    key: "1",
    room: "302",
    company: "OO상사",
    owner: "김OO",
    contact: "01000000000",
    car_type: "BMW OOO",
    monthly_amount: 110000,
    created_at: "2021-01-01",
  },
];

const PrivateCars = () => {
  return (
    <>
      <PageTitle
        title="개인 차량관리"
        subtitle="개인이 직접 등록한 차량을 관리할 수 있습니다."
      />
      <PageTable
        name="개인 차량"
        columns={columns}
        data={data}
        onAddClick={() => alert("추가")}
        onRemoveClick={(selected) => console.log(selected)}
      />
    </>
  );
};

export default PrivateCars;
