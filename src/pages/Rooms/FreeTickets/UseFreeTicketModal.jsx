import { useState } from "react";
import { FormModal, Fields } from "components";

import { freeTickets } from "apis";

const UseFreeTicketModal = ({ visible, roomId, onClose }) => {
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
    const { amount, memo } = form;
    freeTickets.create(roomId, -amount, "USE", memo);
    onClose();
    clearForm();
  };

  const handleCancel = () => {
    onClose();
    clearForm();
  };

  return (
    <FormModal
      title="무료 주차권 사용 처리"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      onClose={onClose}
    >
      <Fields.Number
        label="사용 주차권 장수"
        onChange={(value) => {
          handleInput("amount", value);
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

export default UseFreeTicketModal;
