import styled from "src/styled";

export const ActionBar = styled.div`
  display: flex;
  justify-content: flex-start;
  background: transparent;
  padding: 10px 0px;
  margin: 0 0px 20px;

  & a {
    text-decoration: none;
    color: #333;
    border-radius: 4px;
    background: #eee;
    border: 1px solid #aaa;
    padding: 4px;
    line-height: 20px;
    margin-right: 10px;
    width: 50px;
    text-align: center;

    & .material-icons {
      font-size: 18px;
      line-height: 20px;
      vertical-align: top;
    }

    & span {
      display: none;
      vertical-align: top;
    }

    &:last-of-type {
      margin-right: 0;
    }
  }

  & .left {
    flex: 1;
    display: flex;
  }

  & .right {
    display: flex;
  }

  @media (max-width: 800px) {
    background: #fff;
    margin: 0 -10px 20px;
    padding: 10px 10px;
  }
`;
