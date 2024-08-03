import styled from "styled-components";

const StyledContainer = styled.div`
  background: #2c2c2c;
  width: 320px;
  height: 100%;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const SideToolkit = ({children}) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default SideToolkit;
