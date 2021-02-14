import styled from "styled-components";
import { useHistory, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";

const { Header, Content, Sider } = Layout;

const Logo = styled.div`
  color: #ffffff;
  font-size: 1.2rem;
`;

const getMenuKey = (pathname) => {
  const routes = [
    "rooms",
    "room-accs",
    "private-cars",
    "private-car-accs",
    "paid-tickets",
  ];

  return `${routes.indexOf(pathname.split("/")[1]) + 1}`;
};

const DefaultLayout = ({ children }) => {
  const history = useHistory();
  const location = useLocation();

  return (
    <Layout style={{ height: "100vh" }}>
      <Header className="header">
        <Logo>BUILDING_NAME 차량 관리자 페이지</Logo>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            selectedKeys={[getMenuKey(location.pathname)]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <Menu.Item
              icon={<LaptopOutlined />}
              key="1"
              onClick={() => history.push("/")}
            >
              호실 관리
            </Menu.Item>
            <Menu.Item
              icon={<LaptopOutlined />}
              key="2"
              onClick={() => history.push("/room-accs")}
            >
              호실 수납 관리
            </Menu.Item>
            <Menu.Item
              icon={<LaptopOutlined />}
              key="3"
              onClick={() => history.push("/private-cars")}
            >
              개인차량 관리
            </Menu.Item>
            <Menu.Item
              icon={<LaptopOutlined />}
              key="4"
              onClick={() => history.push("/private-car-accs")}
            >
              개인차량 수납 관리
            </Menu.Item>
            <Menu.Item
              icon={<LaptopOutlined />}
              key="5"
              onClick={() => history.push("/paid-tickets")}
            >
              주차권 판매 관리
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
