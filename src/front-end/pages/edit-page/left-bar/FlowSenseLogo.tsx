import styled from "styled-components";

function FlowSenseLogo() {
  return (
    <StyledContainer>
      <button>Flow Sense</button>
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
    height: 72px;

    &:hover {
      cursor: pointer;
    }
  }
`;
