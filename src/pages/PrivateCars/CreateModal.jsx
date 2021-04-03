import { useState } from "react";
import { FormModal, Fields } from "components";

import { privateCars } from "apis";

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
    privateCars.create(
      roomId,
      carNumber,
      carType,
      owner,
      contact,
      memo,
      carRegisterAt
    );
    onClose();
  };

  const handleCancel = () => {
    console.log(form);
    alert("Cancel");
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
