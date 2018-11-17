import styled from "src/styled";

export const Jumbo = styled.div`
  width: 1000px;
  margin: auto;
  display: flex;
  min-height: calc(100vh - 100px);
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h2 {
    text-align: center;
    font-size: 3em;
  }

  p {
    font-size: 1.4em;
  }
`;
