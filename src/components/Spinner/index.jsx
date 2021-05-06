import React from "react";
import styled from "styled-components";
import { Spin } from "antd";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  color: #ffffff;
  text-shadow: 0 0 3px rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

const Spinner = ({ visible }) => {
  if (!visible) return null;
  return (
    <Wrapper>
      <Spin size="large" />
      <br />
      데이터를 처리중에 있습니다.
    </Wrapper>
  );
};

export default Spinner;
