import styled from "styled-components";
import { Space } from "antd";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SpaceBetween = ({ children, ...props }) => {
  return <Wrapper {...props}>{children}</Wrapper>;
};

SpaceBetween.Box = Space;

export default SpaceBetween;
