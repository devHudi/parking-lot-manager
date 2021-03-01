import { Modal } from "antd";

import { Form } from "components";

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
      <Form>{children}</Form>
    </Modal>
  );
};

export default FormModal;
