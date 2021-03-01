import { useState } from "react";
import { FormModal } from "components";

const CreateRoomModal = ({ visible, onClose }) => {
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

  console.log({ form });

  return (
    <FormModal
      title="호실 추가"
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
        label="입주사 명"
        onChange={(value) => {
          handleInput("company", value);
        }}
      />
      <FormModal.Dropdown
        label="공간 분류"
        items={[
          { label: "상가공간", value: "store" },
          { label: "업무공간", value: "work" },
        ]}
        onChange={(value) => {
          handleInput("area_type", value);
        }}
      />
      <FormModal.Number
        label="면적 (㎡)"
        onChange={(value) => {
          handleInput("area_m", value);
        }}
      />
      <FormModal.DatePicker
        label="면적 (㎡)"
        onChange={(value) => {
          handleInput("date", value);
        }}
      />
      <FormModal.CheckBox
        onChange={(value) => {
          handleInput("check", value);
        }}
      >
        껄껄껄
      </FormModal.CheckBox>
    </FormModal>
  );
};

export default CreateRoomModal;
