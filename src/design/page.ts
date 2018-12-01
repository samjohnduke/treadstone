import styled from "src/styled";

export const Page = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${p => p.theme.backgroundColor};
  color: ${p => p.theme.textColor};
`;
