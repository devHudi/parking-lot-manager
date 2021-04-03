import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import { Space, Button, Typography, Table } from "antd";
import { SaveOutlined, DeleteOutlined } from "@ant-design/icons";

import { rooms, stakeTransfers, cars } from "apis";
import { p2m, m2p } from "utils/calc";

import { PageTitle, Form, Fields, SpaceBetween, Breadcrumb } from "components";

const RoomDetails = () => {
  const history = useHistory();
  const { roomId } = useParams();

  const [room, setRoom] = useState();
  const [form, setForm] = useState({
    company: "",
    type: "store",
    areaM: 0,
    areaP: 0,
    stake: 0,
    freeTickets: 0,
  });

  useEffect(() => {
    setRoom(rooms.find(roomId));
  }, [roomId]);

  useEffect(() => {
    if (room) {
      const { company, type, areaM, defaultStake, totalStake } = room;
      setForm({
        company,
        type,
        areaM,
        areaP: m2p(areaM),
        stake: `${totalStake} (${defaultStake} + ${totalStake - defaultStake})`,
        freeTickets: 0,
      });
    }
  }, [room]);

  const handleCompany = (value) => {
    setForm({
      ...form,
      company: value,
    });
  };

  const handleType = (value) => {
    setForm({
      ...form,
      type: value,
    });
  };

  const handleAreaP = (value) => {
    const areaM = p2m(value);

    setForm({
      ...form,
      areaP: value,
      areaM,
    });
  };

  const handleAreaM = (value) => {
    const areaP = m2p(value);

    setForm({
      ...form,
      areaM: value,
      areaP,
    });
  };

  const handleSave = () => {
    const { company, type, areaM } = form;
    rooms.update(roomId, company, type, areaM);
  };

  const handleRemove = () => {
    rooms.remove([roomId]);
    alert("호실이 제거되었습니다.");
    history.push("/");
  };

  const stakes = stakeTransfers.findAllByRoomId(roomId);
  const stakeSendings = stakes
    .filter((stake) => stake.sendRoomId === roomId)
    .map((stake) => ({
      key: JSON.stringify(stake),
      room: stake.receiveRoomId,
      amount: stake.amount,
    }));
  const stakeReceivings = stakes
    .filter((stake) => stake.receiveRoomId === roomId)
    .map((stake) => ({
      key: JSON.stringify(stake),
      room: stake.sendRoomId,
      amount: stake.amount,
    }));

  const carsData = cars.findAllByRoomId(roomId);

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
          <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>
            호실 정보 저장
          </Button>
          <Button
            type="danger"
            icon={<DeleteOutlined />}
            onClick={handleRemove}
          >
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
          <Button
            type="primary"
            onClick={() => history.push(`/rooms/${roomId}/free-tickets`)}
            icon={<SaveOutlined />}
          >
            무료 주차권 관리
          </Button>
        </SpaceBetween.Box>
      </SpaceBetween>

      <Space direction="vertical" style={{ width: "100%" }}>
        <Form>
          <Fields.Text
            label="입주사 명"
            value={form.company}
            onChange={handleCompany}
          />
          <Fields.Dropdown
            items={[
              { label: "상가공간", value: "store" },
              { label: "업무공간", value: "work" },
            ]}
            label="공간 분류"
            value={form.type}
            onChange={handleType}
          />
          <Fields.Number
            label="면적 (㎡)"
            value={form.areaM}
            onChange={handleAreaM}
          />
          <Fields.Number
            label="면적 (평)"
            value={form.areaP}
            onChange={handleAreaP}
          />
          <Fields.Text disabled label="지분" value={form.stake} />
          <Fields.Number
            disabled
            label="잔여 무료 주차권"
            value={form.freeTickets}
          />
        </Form>

        <Form>
          <Typography.Title level={4}>지분 이전 현황</Typography.Title>
          <Table
            columns={[
              { title: "이전 지분", dataIndex: "amount" },
              { title: "수령 호실", dataIndex: "room" },
            ]}
            dataSource={stakeSendings}
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
            dataSource={stakeReceivings}
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
              { title: "차량 번호", dataIndex: "carNumber" },
              {
                title: "무료/유료",
                dataIndex: "isFree",
                render: (value) => (value ? "예" : "아니오"),
              },
            ]}
            dataSource={carsData}
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
