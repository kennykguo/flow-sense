import styled from "styled-components";

const List = ({ header, listItems }) => {
  return (
    <StyledComponent>
      <h2>{header}</h2>
      <ul>
        {listItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </StyledComponent>
  );
};

export default List;

const StyledComponent = styled.div`
  padding: 10px 40px;
  margin: 10px auto;
  border-radius: 12px;
  max-width: 1500px;

  h2 {
    color: black;
    font-size: 30px;
    padding: none;
    margin: none;
  }

  ul {
    list-style-type: disc;
    list-style-type: none;
    padding: 0;
  }

  li {
    font-weight: 500;
    font-size: 20px;
    line-height: 30px;
    margin-bottom: 10px;
    list-style-type: disc;
    margin-left: 40px;
  }

  strong {
    font-weight: 700;
  }
`;
