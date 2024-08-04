import Form from "../components/Form";
import styled from "styled-components";

function Register() {
  return (
    <StyledComponent>
      <Form route="/api/user/register/" method="register" />
    </StyledComponent>
  );
}

export default Register;

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
