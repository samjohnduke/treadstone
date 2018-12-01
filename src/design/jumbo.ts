import styled from "src/styled";

export const Jumbo = styled.div`
  max-width: 1000px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  & h2 {
    text-align: center;
    font-size: 3em;
  }

  & p {
    font-size: 1.4em;
  }
`;
