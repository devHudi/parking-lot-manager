import { Modal, Input, InputNumber, Select, Typography, Space } from "antd";

const TitleWrapper = ({ label, children }) => {
  return (
    <div>
      <Typography.Text> {label} </Typography.Text>
      {children}
    </div>
  );
};

const Text = ({ label, onChange }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <TitleWrapper label={label}>
      <Input onChange={handleChange} />
    </TitleWrapper>
  );
};

const Number = ({ label, onChange }) => {
  return (
    <TitleWrapper label={label}>
      <InputNumber
        min={0}
        defaultValue={1}
        style={{ width: "100%" }}
        onChange={onChange}
      />
    </TitleWrapper>
  );
};

const Dropdown = ({ items, label, onChange }) => {
  return (
    <TitleWrapper label={label}>
      <Select
        defaultValue={items[0].value}
        style={{ width: "100%" }}
        onChange={onChange}
      >
        {items.map((item) => (
          <Select.Option value={item.value}>{item.label}</Select.Option>
        ))}
      </Select>
    </TitleWrapper>
  );
};

const FormModal = ({ title, visible, children, onOk, onCancel, onClose }) => {
  const handleOk = () => {
    onOk();
    onClose();
  };

  const handleCancel = () => {
    onCancel();
    onClose();
  };

  return (
    <Modal
      title={title}
      visible={visible}
      okText="확인"
      cancelText="취소"
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        {children}
      </Space>
    </Modal>
  );
};

FormModal.Text = Text;
FormModal.Number = Number;
FormModal.Dropdown = Dropdown;

export default FormModal;
