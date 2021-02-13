import { Typography } from "antd";

const { Title } = Typography;

const PageTitle = ({ title, subtitle }) => {
  return (
    <div>
      <Title level={3} style={{ marginBottom: "5px" }}>
        {title}
      </Title>
      {subtitle && (
        <Title level={5} type="secondary" style={{ margin: "0 0 40px 0" }}>
          {subtitle}
        </Title>
      )}
    </div>
  );
};

export default PageTitle;
