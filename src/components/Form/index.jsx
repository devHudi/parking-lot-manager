import { Space, Card } from "antd";

const Form = ({ children }) => {
  return (
    <Card style={{ width: "100%" }}>
      <Space direction="vertical" style={{ width: "100%" }}>
        {children}
      </Space>
    </Card>
  );
};

export default Form;
