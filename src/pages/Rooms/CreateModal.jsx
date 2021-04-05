import { useState } from "react";
import { FormModal, Fields } from "components";

import { rooms } from "apis";

const CreateRoomModal = ({ visible, onClose }) => {
  const [form, setForm] = useState({
    room: "",
    company: "",
    type: "work",
    areaM: 0,
    memo: "",
  });

  const handleInput = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOk = () => {
    const { room, company, type, areaM, memo } = form;

    const isExists = rooms.isExists(room);
    if (isExists) {
      alert("이미 존재하는 호실입니다.");
    } else {
      rooms.create(room, company, type, areaM, memo);
      onClose();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <FormModal
      title="호실 추가"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      onClose={onClose}
    >
      <Fields.Text
        value={form.room}
        label="호실 명"
        onChange={(value) => {
          handleInput("room", value);
        }}
      />
      <Fields.Text
        value={form.company}
        label="입주사 명"
        onChange={(value) => {
          handleInput("company", value);
        }}
      />
      <Fields.Dropdown
        value={form.type}
        label="공간 분류"
        items={[
          { label: "상가공간", value: "store" },
          { label: "업무공간", value: "work" },
        ]}
        onChange={(value) => {
          handleInput("type", value);
        }}
      />
      <Fields.Number
        value={form.areaM}
        label="면적 (㎡)"
        onChange={(value) => {
          handleInput("areaM", value);
        }}
      />
      <Fields.Text
        value={form.memo}
        label="비고"
        onChange={(value) => {
          handleInput("memo", value);
        }}
      />
    </FormModal>
  );
};

export default CreateRoomModal;
