import styled from "src/styled";

export const AppPage = styled.div`
  display: flex;
  width: 1000px;
  margin: auto;
  text-align: left;

  & > aside {
    flex: 0 0 200px;
  }

  & > div {
    flex: 1 0 800px;
    width: 800px;
    display: block;
  }
`;
