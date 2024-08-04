import Form from "../components/Form";
import styled from "styled-components";

function Login() {
  return (
    <StyledComponent>
      <Form route="/api/token/" method="login" />
    </StyledComponent>
  );
}

export default Login;

const StyledComponent = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  background: linear-gradient(
    to right,
    rgba(34, 193, 195, 0.7),
    rgba(253, 187, 45, 0.7)
  );
`;
