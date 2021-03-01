import { useState } from "react";
import { FormModal, Fields } from "components";

const CreateModal = ({ visible, onClose }) => {
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
      title="주차권 판매 추가"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      onClose={onClose}
    >
      <Fields.Text
        label="차량번호"
        onChange={(value) => {
          handleInput("carId", value);
        }}
      />
      <Fields.DatePicker
        label="날짜"
        onChange={(value) => {
          handleInput("amount", value);
        }}
      />
      <Fields.Text
        label="납부 은행"
        onChange={(value) => {
          handleInput("bank", value);
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
