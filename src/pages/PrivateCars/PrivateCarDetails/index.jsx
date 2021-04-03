import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import { Button } from "antd";
import { SaveOutlined, DeleteOutlined } from "@ant-design/icons";

import moment from "moment";

import { privateCars } from "apis";

import { PageTitle, Form, Fields, SpaceBetween, Breadcrumb } from "components";

const PrivateCarDetails = () => {
  const history = useHistory();
  const { carId } = useParams();

  const [privateCar, setPrivateCar] = useState();
  const [form, setForm] = useState({
    roomId: "",
    owner: "",
    contact: "",
    carNumber: "",
    carType: "",
    carRegisterAt: moment(),
  });

  useEffect(() => {
    setPrivateCar(privateCars.find(carId));
  }, [carId]);

  useEffect(() => {
    if (privateCar) {
      const {
        roomId,
        owner,
        contact,
        carNumber,
        carType,
        carRegisterAt,
      } = privateCar;

      setForm({
        roomId,
        owner,
        contact,
        carNumber,
        carType,
        carRegisterAt: moment(carRegisterAt),
      });
    }
  }, [privateCar]);

  const handleRoomId = (value) => {
    setForm({
      ...form,
      roomId: value,
    });
  };

  const handleOwner = (value) => {};

  const handleContact = (value) => {};

  const handleCarNumber = (value) => {};

  const handleCarType = (value) => {};

  const handleCarRegisterAt = (value) => {};

  const handleSave = () => {
    const { roomId, owner, contact, carNumber, carType, carRegisterAt } = form;

    privateCars.update(
      carId,
      roomId,
      owner,
      contact,
      carNumber,
      carType,
      carRegisterAt.toDate()
    );
  };

  return (
    <>
      <Breadcrumb
        items={[
          { link: "/private-cars", text: "개인 차량관리" },
          { text: "개인차량 자세히 보기" },
        ]}
      />
      <PageTitle
        title="개인차량 자세히 보기"
        subtitle="개인차량을 자세히 조회하고 관리할 수 있습니다."
      />

      <SpaceBetween style={{ marginBottom: "10px" }}>
        <SpaceBetween.Box>
          <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>
            호실 정보 저장
          </Button>
          <Button type="danger" icon={<DeleteOutlined />}>
            호실 삭제
          </Button>
        </SpaceBetween.Box>
        <SpaceBetween.Box>
          <Button
            type="primary"
            onClick={() => history.push(`/private-car-accs/`)}
            icon={<SaveOutlined />}
          >
            수납 기록 확인
          </Button>
        </SpaceBetween.Box>
      </SpaceBetween>

      <Form>
        <Fields.Text label="호실" value={form.roomId} onChange={handleRoomId} />
        <Fields.Text
          label="차주 성명"
          value={form.owner}
          onChange={handleOwner}
        />
        <Fields.Text
          label="연락처"
          value={form.contact}
          onChange={handleContact}
        />
        <Fields.Text
          label="차량 번호"
          value={form.carNumber}
          onChange={handleCarNumber}
        />
        <Fields.Text
          label="차종"
          value={form.carType}
          onChange={handleCarType}
        />
        <Fields.Text label="월정 금액" disabled value={110000} />
        <Fields.DatePicker
          label="등록일"
          value={form.carRegisterAt}
          onChange={handleCarRegisterAt}
        />
      </Form>
    </>
  );
};

export default PrivateCarDetails;
