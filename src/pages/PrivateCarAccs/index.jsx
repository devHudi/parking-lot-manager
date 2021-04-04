import { useState } from "react";
import { useHistory } from "react-router-dom";

import { Button, Typography } from "antd";
import {
  CopyOutlined,
  PrinterOutlined,
  CheckOutlined,
  MoneyCollectOutlined,
} from "@ant-design/icons";
import moment from "moment";
import _ from "lodash";

import { privateCarAccs, privateCarPurchases } from "apis";

import { PageTitle, PageTable } from "components";
import PurchaseModal from "./PurchaseModal";

const PrivateCarAccs = () => {
  const history = useHistory();

  const [privateCarId, setPrivateCarId] = useState();
  const [modal, setModal] = useState(false);

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
      dataIndex: "amount",
    },
    {
      title: "수납금액",
      dataIndex: "purchaseAmount",
    },
    {
      title: "수납여부",
      dataIndex: "accType",
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
      title: "고지서 출력",
      dataIndex: "print",
      render: (accId) => (
        <Button icon={<PrinterOutlined />}>고지서 출력</Button>
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
    console.log(privateCarAccs.create());
  };

  const purchaseData = _.chain(
    privateCarPurchases.findAllByDate(
      moment().format("YYYY"),
      moment().format("MM")
    )
  )
    .groupBy("privateCarId")
    .map((row) => {
      return {
        privateCarId: row[0].privateCarId,
        amount: _.reduce(row, (acc, cur) => acc + cur.amount, 0),
      };
    })
    .value();

  const data = privateCarAccs.findAll().map((acc) => {
    const purchase = _.find(
      purchaseData,
      (data) => data.privateCarId === acc.privateCarId
    );
    const purchaseAmount = purchase ? purchase.amount : 0;

    let accType = "미수납";
    if (purchaseAmount >= acc.amount) accType = "수납완료";
    else if (purchaseAmount > 0) accType = "부분수납";

    return {
      ...acc,
      purchaseAmount,
      accType,
      accView: acc.privateCarId,
      print: acc.id,
      purchase: acc.privateCarId,
    };
  });

  return (
    <>
      <PurchaseModal
        visible={modal}
        privateCarId={privateCarId}
        onClose={() => setModal(false)}
      />
      <PageTitle
        title="개인차량 수납/부과 관리"
        subtitle="개인이 직접 등록한 차량에 부과하여 수납관리 및 고지서 출력을 할 수 있습니다."
      />
      <PageTable
        name="개인 차량"
        columns={columns}
        data={data}
        noButtons
        noSelection
        onAddClick={() => alert("추가")}
      >
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
      </PageTable>
    </>
  );
};

export default PrivateCarAccs;
