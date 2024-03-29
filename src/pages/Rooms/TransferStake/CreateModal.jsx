import { useState } from "react";
import { useParams } from "react-router-dom";
import { FormModal, Fields } from "components";

import { stakeTransfers, rooms } from "apis";

import { nullCheck } from "utils/formCheck";

const CreateModal = ({ visible, onClose }) => {
  const { roomId } = useParams();
  const [form, setForm] = useState({
    room: "",
    amount: 1,
    memo: "",
  });

  const clearForm = () => {
    setForm({ room: "", amount: 1, memo: "" });
  };

  const handleInput = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOk = () => {
    const { room: receiveRoomId, amount, memo } = form;

    if (!nullCheck(form)) {
      alert("모든 내용을 채워주세요.");
      return;
    }

    const isExists = rooms.isExists(receiveRoomId);
    if (isExists) {
      stakeTransfers.create(roomId, receiveRoomId, amount, memo);
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
      title="지분 이전"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      onClose={onClose}
    >
      <Fields.Number
        label="이전할 지분 양"
        value={form.amount}
        onChange={(value) => {
          handleInput("amount", value);
        }}
      />
      <Fields.Text
        label="이전 대상 호실"
        value={form.room}
        onChange={(value) => {
          handleInput("room", value);
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
