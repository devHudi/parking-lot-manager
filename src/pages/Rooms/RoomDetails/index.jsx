import { useHistory, useParams } from "react-router-dom";

import { Space, Button, Typography, Table } from "antd";
import { SaveOutlined, DeleteOutlined } from "@ant-design/icons";

import { PageTitle, Form, Fields, SpaceBetween, Breadcrumb } from "components";

const RoomDetails = () => {
  const history = useHistory();
  const { roomId } = useParams();

  return (
    <>
      <Breadcrumb
        items={[
          { link: "/rooms", text: "호실관리" },
          { text: "호실 자세히 보기" },
        ]}
      />
      <PageTitle
        title="호실 자세히 보기"
        subtitle="호실을 자세히 조회하고 관리할 수 있습니다."
      />

      <SpaceBetween style={{ marginBottom: "10px" }}>
        <SpaceBetween.Box>
          <Button type="primary" icon={<SaveOutlined />}>
            호실 정보 저장
          </Button>
          <Button type="danger" icon={<DeleteOutlined />}>
            호실 삭제
          </Button>
        </SpaceBetween.Box>
        <SpaceBetween.Box>
          <Button
            type="primary"
            onClick={() => history.push(`/room-accs/${roomId}`)}
            icon={<SaveOutlined />}
          >
            수납 기록 확인
          </Button>
          <Button type="primary" icon={<SaveOutlined />}>
            무료 주차권 관리
          </Button>
        </SpaceBetween.Box>
      </SpaceBetween>

      <Space direction="vertical" style={{ width: "100%" }}>
        <Form>
          <Fields.Text label="입주사 명" />
          <Fields.Dropdown
            items={[
              { label: "상가공간", value: "store" },
              { label: "업무공간", value: "work" },
            ]}
            label="입주사 명"
          />
          <Fields.Number label="면적 (㎡)" />
          <Fields.Number label="면적 (평)" />
          <Fields.Number disabled label="지분" />
          <Fields.Number disabled label="잔여 무료 주차권" />
        </Form>

        <Form>
          <Typography.Title level={4}>지분 이전 현황</Typography.Title>
          <Table
            columns={[
              { title: "이전 지분", dataIndex: "amount" },
              { title: "수령 호실", dataIndex: "room" },
            ]}
            dataSource={[{ key: 1, amount: 333, room: "B201" }]}
            pagination={{ position: ["none", "none"] }}
          />
        </Form>

        <Form>
          <Typography.Title level={4}>지분 수령 현황</Typography.Title>
          <Table
            columns={[
              { title: "수령 지분", dataIndex: "amount" },
              { title: "이전 호실", dataIndex: "room" },
            ]}
            dataSource={[{ key: 1, amount: 333, room: "B201" }]}
            pagination={{ position: ["none", "none"] }}
          />
        </Form>

        <SpaceBetween>
          <SpaceBetween.Box>
            <div />
          </SpaceBetween.Box>
          <SpaceBetween.Box>
            <Button
              onClick={() => history.push(`/rooms/${roomId}/transfer-stake`)}
            >
              지분 이전 관리
            </Button>
          </SpaceBetween.Box>
        </SpaceBetween>

        <Form>
          <Typography.Title level={4}>차량 현황</Typography.Title>
          <Table
            columns={[
              { title: "차량 번호", dataIndex: "carId" },
              { title: "무료/유료", dataIndex: "free" },
            ]}
            dataSource={[{ key: 1, carId: 333, free: "무료" }]}
            pagination={{ position: ["none", "none"] }}
          />
        </Form>

        <SpaceBetween style={{ marginBottom: "10px" }}>
          <SpaceBetween.Box>
            <div />
          </SpaceBetween.Box>
          <SpaceBetween.Box>
            <Button onClick={() => history.push(`/rooms/${roomId}/cars`)}>
              차량 관리
            </Button>
          </SpaceBetween.Box>
        </SpaceBetween>
      </Space>
    </>
  );
};

export default RoomDetails;
