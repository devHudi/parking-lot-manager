import { useState } from "react";
import { FormModal, Fields } from "components";

import { cars } from "apis";

const CreateModal = ({ visible, roomId, onClose }) => {
  const [form, setForm] = useState({
    carNumber: "",
    carType: "",
    owner: "",
    contact: "",
    memo: "",
  });

  const clearForm = () => {
    setForm({
      carNumber: "",
      carType: "",
      owner: "",
      contact: "",
      memo: "",
    });
  };

  const handleInput = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOk = () => {
    const { carNumber, carType, owner, contact, memo } = form;
    cars.create(roomId, carNumber, carType, owner, contact, memo);
    onClose();
    clearForm();
  };

  const handleCancel = () => {
    onClose();
    clearForm();
  };

  return (
    <FormModal
      title="호실 차량 추가"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      onClose={onClose}
    >
      <Fields.Text disabled value={roomId} label="호실" />
      <Fields.Text
        label="차 번호"
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
      <Fields.Text
        label="차 주인"
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
        label="비고"
        onChange={(value) => {
          handleInput("memo", value);
        }}
      />
    </FormModal>
  );
};

export default CreateModal;
