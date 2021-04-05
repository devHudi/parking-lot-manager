import { useState } from "react";
import { FormModal, Fields } from "components";

import { privateCars, rooms } from "apis";

const CreateModal = ({ visible, onClose }) => {
  const [form, setForm] = useState({});

  const handleInput = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOk = () => {
    const {
      roomId,
      carNumber,
      carType,
      owner,
      contact,
      memo,
      carRegisterAt,
    } = form;

    const isExists = rooms.isExists(roomId);
    if (isExists) {
      privateCars.create(
        roomId,
        carNumber,
        carType,
        owner,
        contact,
        memo,
        carRegisterAt
      );
    } else {
      alert("해당 호실이 존재하지 않습니다. 호실 입력을 다시 확인해주세요.");
    }

    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <FormModal
      title="개인 차량 추가"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      onClose={onClose}
    >
      <Fields.Text
        label="호실 명"
        onChange={(value) => {
          handleInput("roomId", value);
        }}
      />
      <Fields.Text
        label="차주 성명"
        onChange={(value) => {
          handleInput("owner", value);
        }}
      />
      <Fields.Text
        label="차주 연락처"
        onChange={(value) => {
          handleInput("contact", value);
        }}
      />
      <Fields.Text
        label="차량번호"
        onChange={(value) => {
          handleInput("carNumber", value);
        }}
      />
      <Fields.Text
        label="차종"
        onChange={(value) => {
          handleInput("carType", value);
        }}
      />
      <Fields.DatePicker
        label="등록일자"
        onChange={(value) => {
          handleInput("carRegisterAt", value);
        }}
      />
      <Fields.Text
        label="비고"
        onChange={(value) => {
          handleInput("memo", value);
        }}
      />
    </FormModal>
  );
};

export default CreateModal;
