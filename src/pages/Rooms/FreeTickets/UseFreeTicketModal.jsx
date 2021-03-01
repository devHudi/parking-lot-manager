import { useState } from "react";
import { FormModal } from "components";

const UseFreeTicketModal = ({ visible, onClose }) => {
  const [form, setForm] = useState({});

  const handleInput = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOk = () => {
    console.log(form);
    alert("OK");
    onClose();
  };

  const handleCancel = () => {
    console.log(form);
    alert("Cancel");
    onClose();
  };

  return (
    <FormModal
      title="무료 주차권 사용 처리"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      onClose={onClose}
    >
      <FormModal.Number
        label="사용 주차권 장수"
        onChange={(value) => {
          handleInput("amount", value);
        }}
      />
      <FormModal.Text
        label="비고"
        onChange={(value) => {
          handleInput("memo", value);
        }}
      />
    </FormModal>
  );
};

export default UseFreeTicketModal;
