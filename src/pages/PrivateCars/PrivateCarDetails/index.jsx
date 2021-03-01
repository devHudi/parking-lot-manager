import { useHistory, useParams } from "react-router-dom";

import { Button } from "antd";
import { SaveOutlined, DeleteOutlined } from "@ant-design/icons";

import moment from "moment";

import { PageTitle, Form, Fields, SpaceBetween, Breadcrumb } from "components";

const PrivateCarDetails = () => {
  const history = useHistory();
  const { roomId } = useParams();

  return (
    <>
      <Breadcrumb
        items={[
          { link: "/private-cars", text: "개인 차량관리" },
          { text: "개인차량 자세히 보기" },
        ]}
      />
      <PageTitle
        title="개인차량 자세히 보기"
        subtitle="개인차량을 자세히 조회하고 관리할 수 있습니다."
      />

      <SpaceBetween style={{ marginBottom: "10px" }}>
        <SpaceBetween.Box>
          <Button type="primary" icon={<SaveOutlined />}>
            호실 정보 저장
          </Button>
          <Button type="danger" icon={<DeleteOutlined />}>
            호실 삭제
          </Button>
        </SpaceBetween.Box>
        <SpaceBetween.Box>
          <Button
            type="primary"
            onClick={() => history.push(`/private-car-accs/${roomId}`)}
            icon={<SaveOutlined />}
          >
            수납 기록 확인
          </Button>
        </SpaceBetween.Box>
      </SpaceBetween>

      <Form>
        <Fields.Text label="호실" />
        <Fields.Text label="입주사 명" />
        <Fields.Text label="차주 성명" />
        <Fields.Text label="연락처" />
        <Fields.Text label="차량 번호" />
        <Fields.Text label="차종" />
        <Fields.Text label="월정 금액" disabled value={110000} />
        <Fields.DatePicker label="등록일" defaultValue={moment()} />
      </Form>
    </>
  );
};

export default PrivateCarDetails;
