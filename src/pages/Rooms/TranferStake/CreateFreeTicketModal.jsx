import { useState } from "react";
import { FormModal } from "components";

const TransferStakeModal = ({ visible, onClose }) => {
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
      title="지분 이전"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      onClose={onClose}
    >
      <FormModal.Number
        label="이전할 지분 양"
        onChange={(value) => {
          handleInput("amount", value);
        }}
      />
      <FormModal.Text
        label="이전 대상 호실"
        onChange={(value) => {
          handleInput("room", value);
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

export default TransferStakeModal;
