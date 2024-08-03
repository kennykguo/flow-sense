import styled from "styled-components";

const  ToolSelection = (children) => {
  return <StyledContainer>{children}</StyledContainer>;
}

export default ToolSelection;

const StyledContainer = styled.div`
  border-bottom: 1px solid #444444;
  padding: 8px;
`;
