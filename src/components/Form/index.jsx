import { Space } from "antd";

const Form = ({ children }) => {
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      {children}
    </Space>
  );
};

export default Form;
