import styled from "styled-components";
import SideToolkit from "./SideToolkit";
import ToolSelection from "./ToolSection";
import FlowSenseLogo from "./left-bar/FlowSenseLogo";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
`;

// function handleMouseUp() {}

const EditPage = () => {
  return (
    <Container>
      <SideToolkit>
        <ToolSelection>
          <FlowSenseLogo></FlowSenseLogo>
        </ToolSelection>
      </SideToolkit>

      <SideToolkit>
        <div></div>
      </SideToolkit>
    </Container>
  );
}

export default EditPage;
