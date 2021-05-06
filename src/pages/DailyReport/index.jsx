import { useState } from "react";
import { DatePicker, Typography, Table, Space } from "antd";
import moment from "moment";

import { PageTitle, SpaceBetween, Form, VerticalSpace } from "components";
import consts from "consts";

import { useForceUpdate } from "hooks";

import { dailyReport } from "apis";

const totalColumns = [
  {
    title: "구분",
    dataIndex: "type",
  },
  {
    title: "현금",
    dataIndex: "cash",
  },
  {
    title: "카드",
    dataIndex: "card",
  },
  {
    title: "합계",
    dataIndex: "total",
  },
];

const cashColumns = [
  {
    title: "은행",
    dataIndex: "bank",
  },
  {
    title: "입금자",
    dataIndex: "depositor",
  },
  {
    title: "호실",
    dataIndex: "room",
  },
  {
    title: "내역",
    dataIndex: "content",
  },
  {
    title: "주차권",
    dataIndex: "ticket",
  },
  {
    title: "월주차",
    dataIndex: "monthly",
  },
  // {
  //   title: "원동기 자전거",
  //   dataIndex: "bike",
  // },
  {
    title: "세계",
    dataIndex: "isRnE",
    render: (value) => (value ? "O" : "X"),
  },
  {
    title: "처리 (R/C/M)",
    dataIndex: "RCM",
  },
  {
    title: "비고",
    dataIndex: "memo",
  },
];

const cardColumns = [
  {
    title: "호실",
    dataIndex: "room",
  },
  {
    title: "내역",
    dataIndex: "content",
  },
  {
    title: "카드사",
    dataIndex: "bank",
  },
  {
    title: "주차권",
    dataIndex: "ticket",
  },
  {
    title: "월주차",
    dataIndex: "monthly",
  },
  // {
  //   title: "원동기 자전거",
  //   dataIndex: "bike",
  // },
  {
    title: "처리 (R/C/M)",
    dataIndex: "RCM",
  },
  {
    title: "비고",
    dataIndex: "memo",
  },
];

const DailyReport = () => {
  const [date, setDate] = useState(new Date());

  return (
    <>
      <PageTitle
        title="주차 정산 일지"
        subtitle="현금 및 카드 매출 집계를 확인하세요."
      />
      <VerticalSpace>
        <SpaceBetween>
          <div>* Registration(등록) / Charge(충전) / Magnetic(마그네틱)</div>
          <div>
            <DatePicker
              placeholder="날짜 선택"
              defaultValue={moment()}
              onChange={(date) => {
                setDate(date.toDate());
              }}
            />
          </div>
        </SpaceBetween>

        <Form>
          <Typography.Title level={4}>매출 집계</Typography.Title>
          <Table
            name="매출 집계"
            columns={totalColumns}
            dataSource={dailyReport.findTotalDailyReport(date)}
          />
        </Form>

        <Form>
          <Typography.Title level={4}>현금 매출</Typography.Title>
          <Table
            name="현금 매출"
            columns={cashColumns}
            dataSource={dailyReport.findCashDailyReport(date)}
          />
        </Form>

        <Form>
          <Typography.Title level={4}>카드 매출</Typography.Title>
          <Table
            name="카드 매출"
            columns={cardColumns}
            dataSource={dailyReport.findCardDailyReport(date)}
          />
        </Form>
      </VerticalSpace>
    </>
  );
};

// TODO: RCM하고 세계, 원동기 자전거, 비고, 카드사 는 어떻게 나와야 하는지 물어봐야함

export default DailyReport;
