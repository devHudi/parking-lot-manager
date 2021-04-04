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
  const [searchMethod, setSearchMethod] = useState("room");

  const forceUpdate = useForceUpdate();

  const handleRemove = (selected) => {
    const idList = selected.map((row) => row.id);
    privateCars.remove(idList);
    forceUpdate();
  };

  const data = privateCars
    .findAll()
    .map((row) => ({ ...row, monthlyAmount: 110000 }));

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
        data={data}
        onAddClick={() => setModal(true)}
        onRemoveClick={handleRemove}
        onRowClick={(data) => history.push(`/private-cars/${data.id}`)}
      >
        <Select
          defaultValue="room"
          onChange={(value) => setSearchMethod(value)}
        >
          <Select.Option value="room">호실</Select.Option>
          <Select.Option value="company">입주사</Select.Option>
          <Select.Option value="carNumber">차량번호</Select.Option>
          <Select.Option value="carType">차종</Select.Option>
          <Select.Option value="owner">차주</Select.Option>
          <Select.Option value="contact">연락처</Select.Option>
        </Select>
        <Input.Search
          placeholder="검색어"
          allowClear
          enterButton
          onSearch={(value) => console.log({ searchMethod, value })}
          /* TODO: 검색 가능하도록 해야함 */
        />
      </PageTable>
    </>
  );
};

export default PrivateCars;
