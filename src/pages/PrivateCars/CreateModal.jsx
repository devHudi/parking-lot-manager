import { useState } from "react";
import { FormModal } from "components";

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
      title="개인 차량 추가"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      onClose={onClose}
    >
      <FormModal.Text
        label="호실 명"
        onChange={(value) => {
          handleInput("room", value);
        }}
      />
      <FormModal.Text
        label="차주 성명"
        onChange={(value) => {
          handleInput("owner", value);
        }}
      />
      <FormModal.Text
        label="차주 연락처"
        onChange={(value) => {
          handleInput("contact", value);
        }}
      />
      <FormModal.Text
        label="차량번호"
        onChange={(value) => {
          handleInput("carId", value);
        }}
      />
      <FormModal.Text
        label="차종"
        onChange={(value) => {
          handleInput("carType", value);
        }}
      />
      <FormModal.Text
        label="은행"
        onChange={(value) => {
          handleInput("bank", value);
        }}
      />
      <FormModal.DatePicker
        label="등록일자"
        onChange={(value) => {
          handleInput("carId", value);
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

export default CreateModal;
