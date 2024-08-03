import styled from "styled-components";

const FlowSenseLogo = ({ title }) => {
  return (
    <StyledContainer>
      <button>{title}</button>
    </StyledContainer>
  );
}

export default FlowSenseLogo;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    font-size: 32px;
    font-weight: 800;
    padding: 0;
    background: none;
    border: none;
    height: 30px;
    margin-bottom: 16px;

    &:hover {
      cursor: pointer;
    }
  }
`;
