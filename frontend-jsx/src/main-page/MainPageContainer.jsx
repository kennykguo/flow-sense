import PDFViewer from "./PDFViewer";
import styled from "styled-components";
import SideToolkit from "./SideToolkit";
import FlowSenseLogo from "./FlowSenseLogo";
import ToolSelection from "./ToolSection";
import Button from "./Button";
import leftArrow from "/left-arrow.svg";
import rightArrow from "/right-arrow.svg";
import explainIcon from "/explain.svg";
import commentIcon from "/comment.svg";
import eyeOpen from "/eye-open.svg";
import eyeClose from "/eye-close.svg";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  gap: 32px;
`;

const MainPageContainer = () => {
  return (
    <Container>
      <SideToolkit>
        <ToolSelection>
          <FlowSenseLogo title="Flow Sense" />
        </ToolSelection>
        <ToolSelection header="Change Line">
          <Button desc="A:prev" img={leftArrow} />
          <Button desc="D:next" img={rightArrow} />
        </ToolSelection>
        <ToolSelection header="Text Help">
          <Button desc="E:explain" img={explainIcon} />
        </ToolSelection>
        <ToolSelection header="Text Interaction">
          <Button desc="C:comment" img={commentIcon} />
        </ToolSelection>
        <ToolSelection header="Mark Read/Unread">
          <Button desc="S:mark read" img={eyeOpen} />
          <Button desc="Z:mark unread" img={eyeClose} />
        </ToolSelection>
      </SideToolkit>
      <PDFViewer />
    </Container>
  );
};

export default MainPageContainer;
