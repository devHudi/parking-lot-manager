import styled from "styled-components";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";

import { Spinner } from "components";
import { fileDialog } from "apis";

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

  const spinner = useSelector((state) => state.spinner);

  return (
    <>
      <Spinner visible={spinner.visible} />
      <Layout style={{ height: "100vh" }}>
        <Header className="header">
          <Logo>차량 관리자 페이지</Logo>
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
              <Menu.Item
                icon={<LaptopOutlined />}
                key="6"
                onClick={() => history.push("/daily-report")}
              >
                주차 일일 정산
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item
                icon={<LaptopOutlined />}
                key="7"
                onClick={() => console.log(fileDialog.importCsv())}
              >
                엑셀에서 불러오기
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ padding: "0 24px 24px", overflow: "auto" }}>
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
    </>
  );
};

// TODO: 아이콘 바꾸기
export default DefaultLayout;
