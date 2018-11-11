import styled from "src/styled";

export const Form = styled.form`
  flex: 1;
  width: 350px; 
  padding: 40px 30px 100px;
  display: flex;
  flex-direction: column;
  height: calc(100% - 140px);

  & h1 {
    font-size: 1.4em;
    color: rgba(0,0,0,0.4);
    margin-bottom: 60px;

    a {
      color: rgba(0,0,0,0.4);
      text-decoration: none;
    }
  }

  & h2 {
    font-size: 1.75em;
    margin: 0 0 0 0;
  }

  & h3 {
    margin: 10px 0 30px 0;
    color: rgba(0,0,0,0.4);
    font-size: 0.9em;
    font-family: 'Roboto', sans-serif;
  }

  a {
    font-size: 1em;
    color: rgba(0, 0, 0, 0.8);
  }
`

export const FormBar = styled.div`
  display: flex;
  align-items: center;
  height: 100px;

  & div {
    flex: 1;
  }

  & div:last-of-type {
    display: flex;
    flex-direction: column;
    text-align: right;
  }
`