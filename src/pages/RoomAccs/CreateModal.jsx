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
      title="수납 처리"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      onClose={onClose}
    >
      <Fields.DatePicker
        label="납부 날짜"
        onChange={(value) => {
          handleInput("date", value);
        }}
      />
      <Fields.Number
        label="납부 금액"
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
      <Fields.CheckBox
        onChange={(value) => {
          handleInput("fake", value);
        }}
      >
        이 수납은 가수납 입니다.
      </Fields.CheckBox>
    </FormModal>
  );
};

export default CreateModal;
