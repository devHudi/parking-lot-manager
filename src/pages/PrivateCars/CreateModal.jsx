import { useState } from "react";
import moment from "moment";
import { FormModal, Fields } from "components";

import { nullCheck } from "utils/formCheck";

import { privateCars, rooms } from "apis";

const CreateModal = ({ visible, onClose }) => {
  const [form, setForm] = useState({});

  const clearForm = () => {
    setForm({});
  };

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

    if (!nullCheck(form)) {
      alert("모든 내용을 채워주세요.");
      return;
    }

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
    clearForm();
  };

  const handleCancel = () => {
    onClose();
    clearForm();
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
        value={form.roomId}
        onChange={(value) => {
          handleInput("roomId", value);
        }}
      />
      <Fields.Text
        label="차주 성명"
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
        label="차량번호"
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
      <Fields.DatePicker
        label="등록일자"
        value={moment(form.carRegisterAt)}
        onChange={(value) => {
          handleInput("carRegisterAt", value);
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
