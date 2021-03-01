import { useHistory } from "react-router-dom";

import { Button, Typography } from "antd";
import {
  CopyOutlined,
  PrinterOutlined,
  CheckOutlined,
  MoneyCollectOutlined,
} from "@ant-design/icons";

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
    title: "차량 번호",
    dataIndex: "car_number",
  },
  {
    title: "차종",
    dataIndex: "car_type",
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
    dataIndex: "monthly_amount",
  },
  {
    title: "수납금액",
    dataIndex: "acc_amount",
  },
  {
    title: "수납여부",
    dataIndex: "acc_type",
  },
  {
    title: "수납기록 조회",
    dataIndex: "acc_view",
  },
  {
    title: "고지서 출력",
    dataIndex: "print_bill",
  },
  {
    title: "수납처리",
    dataIndex: "do_acc",
  },
];

const PrivateCarAccs = () => {
  const history = useHistory();

  const data = [
    {
      key: "1",
      room: "302",
      company: "OO상사",
      car_number: "3423",
      car_type: "BMW OOO",
      owner: "김OO",
      contact: "01000000000",
      monthly_amount: 110000,
      acc_amount: 50000,
      acc_type: "미수납 (부분수납)",
      acc_view: (
        <Button
          onClick={() => history.push(`/private-car-accs/302`)}
          icon={<CopyOutlined />}
        >
          수납기록 조회
        </Button>
      ),
      print_bill: <Button icon={<PrinterOutlined />}> 고지서 출력 </Button>,
      do_acc: (
        <Button type="primary" icon={<CheckOutlined />}>
          수납 처리
        </Button>
      ),
    },
  ];
  return (
    <>
      <PageTitle
        title="개인차량 수납/부과 관리"
        subtitle="개인이 직접 등록한 차량에 부과하여 수납관리 및 고지서 출력을 할 수 있습니다."
      />
      <PageTable
        name="개인 차량"
        columns={columns}
        data={data}
        noButtons
        onAddClick={() => alert("추가")}
        onRemoveClick={(selected) => console.log(selected)}
      >
        <Button type="danger" icon={<MoneyCollectOutlined />}>
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
