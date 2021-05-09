import { useState } from "react";
import { FormModal, Fields } from "components";

import { cars } from "apis";

import { nullCheck } from "utils/formCheck";

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

    if (!nullCheck(form)) {
      alert("모든 내용을 채워주세요.");
      return;
    }

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
        value={form.carNumber}
        onChange={(value) => {
          handleInput("carNumber", value);
        }}
      />
      <Fields.Text
        label="차종"
        value={form.carType}
        onChange={(value) => {
          handleInput("carType", value);
        }}
      />
      <Fields.Text
        label="차 주인"
        value={form.owner}
        onChange={(value) => {
          handleInput("owner", value);
        }}
      />
      <Fields.Text
        label="차주 연락처"
        value={form.contact}
        onChange={(value) => {
          handleInput("contact", value);
        }}
      />
      <Fields.Text
        label="비고"
        value={form.memo}
        onChange={(value) => {
          handleInput("memo", value);
        }}
      />
    </FormModal>
  );
};

export default CreateModal;
