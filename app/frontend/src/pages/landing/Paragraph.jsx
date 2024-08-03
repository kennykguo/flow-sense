import styled from "styled-components";

const Paragraph = ({ header, description }) => {
  return (
    <StyledComponent>
      <h2>{header}</h2>
      <h3>{description}</h3>
    </StyledComponent>
  );
};

export default Paragraph;

const StyledComponent = styled.div`
  padding: 40px;
  margin: 10px auto;
  border-radius: 12px;
  max-width: 1500px;

  h2 {
    color: black;
    font-size: 30px;
    padding: none;
    margin-none; 
  }

  h3 {
    font-weight: 500;
    font-size: 20px;
    line-height: 30px;
  }
`;
