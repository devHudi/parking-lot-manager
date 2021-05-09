import { useState } from "react";
import { useHistory } from "react-router-dom";

import { Button, Space, Typography, Select } from "antd";
import {
  CopyOutlined,
  PrinterOutlined,
  CheckOutlined,
  MoneyCollectOutlined,
} from "@ant-design/icons";
import moment from "moment";
import _ from "lodash";

import { range } from "utils/calc";

import { privateCars, privateCarAccs, privateCarPurchases } from "apis";

import { useForceUpdate } from "hooks";

import { PageTitle, PageTable, SpaceBetween } from "components";
import PurchaseModal from "./PurchaseModal";

const PrivateCarAccs = () => {
  const history = useHistory();

  const [privateCarId, setPrivateCarId] = useState();
  const [modal, setModal] = useState(false);

  const curYear = moment().format("YYYY");
  const curMonth = moment().format("MM");

  const [year, setYear] = useState(curYear);
  const [month, setMonth] = useState(curMonth);

  const forceUpdate = useForceUpdate();

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
      title: "차량 번호",
      dataIndex: "carNumber",
    },
    {
      title: "차종",
      dataIndex: "carType",
    },
    {
      title: "차주",
      dataIndex: "owner",
    },
    {
      title: "연락처",
      dataIndex: "contact",
    },
    {
      title: "월정금액",
      dataIndex: "accAmount",
    },
    {
      title: "수납금액",
      dataIndex: "purchaseAmount",
    },
    {
      title: "수납여부",
      dataIndex: "accStatus",
    },
    {
      title: "수납기록 조회",
      dataIndex: "accView",
      render: (privateCarId) => (
        <Button
          onClick={() => history.push(`/private-car-accs/${privateCarId}`)}
          icon={<CopyOutlined />}
        >
          수납기록 조회
        </Button>
      ),
    },
    {
      title: "고지서 생성",
      dataIndex: "print",
      render: (accId) => (
        <Button icon={<PrinterOutlined />}>고지서 생성</Button>
      ),
    },
    {
      title: "수납처리",
      dataIndex: "purchase",
      render: (privateCarId) => (
        <Button
          icon={<CheckOutlined />}
          onClick={() => {
            setPrivateCarId(privateCarId);
            setModal(true);
          }}
        >
          수납 처리
        </Button>
      ),
    },
  ];

  const handleCreate = () => {
    privateCarAccs.create();
    forceUpdate();
  };

  const data = privateCars.getAccTable(year, month);

  return (
    <>
      <PurchaseModal
        visible={modal}
        privateCarId={privateCarId}
        onClose={() => setModal(false)}
      />
      <PageTitle
        title="개인차량 수납/부과 관리"
        subtitle="개인이 직접 등록한 차량에 부과하여 수납관리 및 고지서 생성을 할 수 있습니다."
      />
      <SpaceBetween>
        <div>
          <Space>
            <Button
              type="danger"
              icon={<MoneyCollectOutlined />}
              onClick={handleCreate}
            >
              금월 부과 처리
            </Button>
            <Typography.Text type="danger">
              * 부과 처리는 매월 최소한 한번은 실행해야합니다.
            </Typography.Text>
          </Space>
        </div>
        <div>
          <Space>
            <Select
              defaultValue={curYear}
              style={{ width: "100px" }}
              onChange={(value) => setYear(value)}
            >
              {range(Number(curYear) - 30, Number(curYear) + 30).map((year) => (
                <Select.Option value={year}>{year}</Select.Option>
              ))}
            </Select>
            년
            <Select
              defaultValue={curMonth}
              style={{ width: "100px" }}
              onChange={(value) => setMonth(value)}
            >
              {range(1, 12).map((year) => (
                <Select.Option value={year}>{year}</Select.Option>
              ))}
            </Select>
            월
          </Space>
        </div>
      </SpaceBetween>
      <PageTable
        name="개인 차량"
        columns={columns}
        data={data}
        noButtons
        noSelection
      />
    </>
  );
};

export default PrivateCarAccs;
