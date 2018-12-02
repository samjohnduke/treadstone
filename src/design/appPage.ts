import styled from "src/styled";

export const AppPage = styled.div`
  display: flex;
  margin: auto;
  text-align: left;

  & aside {
    flex: 0 0 200px;
  }

  & > div {
    flex: 1;
    max-width: 800px;
    display: block;
    padding-left: 20px;
  }
`;
