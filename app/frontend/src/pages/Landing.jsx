import styled from "styled-components";
import Paragraph from "../components/Paragraph";

const Landing = () => {
  return (
    <Container>
      <StyledContainer>
        <h1>FlowSense</h1>
        <h2>Optimize Your Reading Experience</h2>

        <div className="button-container">
          <StyledButton>Log In</StyledButton>
          <StyledButton>Sign Up</StyledButton>
        </div>
      </StyledContainer>

      <Paragraph header="Hello" description="hello" />
    </Container>
  );
};

export default Landing;

const Container = styled.div``;

const StyledContainer = styled.div`
  padding: 60px;
  background: linear-gradient(
    to right,
    rgba(34, 193, 195, 0.7),
    rgba(253, 187, 45, 0.7)
  );
  text-align: center;

  h1 {
    margin: 0;
    font-size: 140px;
    font-weight: 900;
    color: white;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  }

  h2 {
    font-size: 36px;
    font-weight: 700;
    margin-top: 20px;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
    color: rgba(255, 255, 255, 0.9); /* Lighter grey color */
  }

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .button-container {
    display: flex;
    gap: 20px;
    margin-top: 40px;
  }
`;

const StyledButton = styled.div`
  background: linear-gradient(
    45deg,
    #ff6b6b,
    #f06595,
    #cc5de8,
    #845ef7,
    #5c7cfa,
    #339af0,
    #22b8cf,
    #20c997,
    #51cf66,
    #94d82d,
    #fcc419,
    #ff922b
  );
  background-size: 300% 300%;
  animation: gradientAnimation 5s ease infinite;
  border: none;
  border-radius: 50px;
  color: white;
  padding: 15px 30px;
  font-size: 25px;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin: 10px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  }

  @keyframes gradientAnimation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;
