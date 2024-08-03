import styled from "styled-components";

const Button = ({ desc, img }) => {
  return (
    <StyledContainer>
      <StyledButton>
        <img src={img} alt={desc}/>
      </StyledButton>
      <h3>{desc}</h3>
    </StyledContainer>
  );
};

export default Button;

const StyledButton = styled.button`
  background: #383838;
  padding: 8px;

  img {
    width: 32px;
    transform: rotate(180deg);
  }
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h3 {
    margin: 0;
    font-weight: 400;
    font-size: 10px;
  }
`;
