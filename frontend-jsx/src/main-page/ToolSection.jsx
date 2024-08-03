import styled from "styled-components";

const ToolSelection = ({ children, header }) => {
  return (
    <StyledContainer>
      <h2>{header}</h2>
      <div>{children}</div>
    </StyledContainer>
  );
};

export default ToolSelection;

const StyledContainer = styled.div`
  border-bottom: 1px solid #444444;
  padding: 16px 8px;
  display: flex;
  align-items: center;
  flex-direction: column;

  h2 {
    margin: 0; 
    margin-bottom: 8px;
    padding: 0;
    font-size: 12px;
    text-decoration: underline;
  }

  div {
    display: flex;
    gap: 16px;
  }
`;
