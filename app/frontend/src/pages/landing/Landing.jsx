import styled from "styled-components";
import Paragraph from "./Paragraph";
import { useNavigate } from "react-router-dom";
import List from "./List";

const Landing = () => {
  const navigate = useNavigate();
  const features = [
    "Indicates reading progress so users can quickly identify what they have already read.",
    "Provides contextual explanations for individual sentences using GPT.",
    "Visualizes reading progress.",
    "Allows users to add their own notes, breaking paragraphs for easier reading.",
    "Highlights significant sentences for easy reference.",
  ];

  return (
    <Container>
      <StyledContainer>
        <h1>FlowSense</h1>
        <h2>Optimize Your Reading Experience</h2>

        <div className="button-container">
          <StyledButton onClick={() => navigate("/login")}>Log In</StyledButton>
          <StyledButton onClick={() => navigate("/register")}>
            Sign Up
          </StyledButton>
        </div>
      </StyledContainer>

      <Paragraph
        header="What is FlowSense?"
        description="FlowSense is an innovative reading tool designed to assist users in dissecting complex information more efficiently. By leveraging interactive, visual, and assistive features, FlowSense helps users stay focused and engaged while reading advanced reports, textbooks, news articles, and more."
      />
      <Paragraph
        header="Why FlowSense?"
        description="At FlowSense, our team is dedicated to enhancing your reading experience. During our internships and professional experiences, we frequently encountered challenges in digesting extensive and intricate reports. We realized that traditional reading methods were not sufficient to keep up with the pace and volume of information we needed to process."
      />
      <List header="Our Key Features" listItems={features} />
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
    margin-top: 50px;
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

const StyledButton = styled.button`
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
