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

const data = [
  {
    key: "1",
    room: "302",
    company: "OO상사",
    monthly_amount: 110000,
    acc_amount: 50000,
    acc_type: "미수납 (부분수납)",
    acc_view: <Button icon={<CopyOutlined />}> 수납기록 조회 </Button>,
    print_bill: <Button icon={<PrinterOutlined />}> 고지서 출력 </Button>,
    do_acc: (
      <Button type="primary" icon={<CheckOutlined />}>
        수납 처리
      </Button>
    ),
  },
];

const RoomAccs = () => {
  return (
    <>
      <PageTitle
        title="호실 수납/부과 관리"
        subtitle="초과 지분 사용중인 호실에 부과하여 수납관리 및 고지서 출력을 할 수 있습니다."
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

export default RoomAccs;
