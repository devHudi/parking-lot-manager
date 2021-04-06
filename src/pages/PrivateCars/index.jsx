import { useState } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";

import { privateCars } from "apis";

import { Input, Select } from "antd";

import consts from "consts";

import { useForceUpdate } from "hooks";

import { PageTitle, PageTable } from "components";

import CreateModal from "./CreateModal";

const columns = [
  {
    title: "호실",
    dataIndex: "roomId",
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
    title: "해당 차량",
    dataIndex: "carNumber",
  },
  {
    title: "차종",
    dataIndex: "carType",
  },
  {
    title: "월정금액",
    dataIndex: "monthlyAmount",
  },
  {
    title: "등록일",
    dataIndex: "carRegisterAt",
    render: (value) => moment(value).format(consts.DATE_FORMAT),
  },
];

const PrivateCars = () => {
  const history = useHistory();
  const [modal, setModal] = useState(false);
  const [searchMethod, setSearchMethod] = useState("roomId");
  const [searchKeyword, setSearchKeyword] = useState("");

  const forceUpdate = useForceUpdate();

  const handleRemove = (selected) => {
    if (
      window.confirm(
        "해당 차량을 정말로 삭제할까요? 차량 관련된 정보 (부과/수납 등) 이 모두 사라집니다."
      )
    ) {
      const idList = selected.map((row) => row.id);
      privateCars.remove(idList);
      alert("차량이 제거되었습니다.");
      forceUpdate();
    }
  };

  const data = privateCars
    .findAll()
    .map((row) => ({ ...row, monthlyAmount: 110000 }));

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
        title="개인 차량관리"
        subtitle="개인이 직접 등록한 차량을 관리할 수 있습니다."
      />
      <PageTable
        name="개인 차량"
        columns={columns}
        data={filteredData}
        onAddClick={() => setModal(true)}
        onRemoveClick={handleRemove}
        onRowClick={(data) => history.push(`/private-cars/${data.id}`)}
      >
        <Select
          defaultValue="roomId"
          onChange={(value) => setSearchMethod(value)}
        >
          <Select.Option value="roomId">호실</Select.Option>
          <Select.Option value="company">입주사</Select.Option>
          <Select.Option value="carNumber">차량번호</Select.Option>
          <Select.Option value="carType">차종</Select.Option>
          <Select.Option value="owner">차주</Select.Option>
          <Select.Option value="contact">연락처</Select.Option>
        </Select>
        <Input
          placeholder="검색어"
          allowClear
          onChange={(e) => {
            setSearchKeyword(e.target.value);
          }}
          enterButton
        />
      </PageTable>
    </>
  );
};

export default PrivateCars;
