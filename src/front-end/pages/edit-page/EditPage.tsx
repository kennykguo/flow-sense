import styled from "styled-components";
import SideToolkit from "./SideToolkit";
import ToolSelection from "./ToolSection";
import FlowSenseLogo from "./left-bar/FlowSenseLogo";
import randomPdf from "/Users/dylannagel/Desktop/flow-sense/src/assets/random.pdf";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
`;

function EditPage() {
  return (
    <Container>
      <SideToolkit>
        <ToolSelection>
          <FlowSenseLogo></FlowSenseLogo>
        </ToolSelection>
      </SideToolkit>

      <object
        className="pdf"
        data={randomPdf}
        width="800"
        height="500"
      ></object>

      <SideToolkit>
        <div></div>
      </SideToolkit>
    </Container>
  );
}

export default EditPage;
