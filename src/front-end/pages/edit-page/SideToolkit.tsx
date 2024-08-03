import { ReactNode } from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  background: #2c2c2c;
  width: 210px;
  height: 100%;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

function SideToolkit({ children }: { children: ReactNode }) {
  return <StyledContainer>{children}</StyledContainer>;
}

export default SideToolkit;
