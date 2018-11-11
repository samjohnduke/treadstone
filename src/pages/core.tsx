import { Link, RouteComponentProps } from '@reach/router';
import * as React from 'react';
import { AUTHENTICATE, HOME } from 'src/constants/routes'; 
import { Page } from 'src/design/page';
import { doSignOut } from 'src/firebase/auth';
import { withAuthorization } from 'src/firebase/withAuthorisation';
import { UserProps } from 'src/firebase/withUser';
import styled from 'src/styled';

const Board = styled.div`
  flex: 1;
  width: 100vw;
  height: 100vh;
  background: #fffdf9; 
  overflow: hidden;
  position: relative;
  background-image: repeating-linear-gradient(0deg,transparent,transparent 199px,#dfdfdf 199px,#dfdfdf 200px),repeating-linear-gradient(-90deg,transparent,transparent 199px,#dfdfdf 199px,#dfdfdf 200px), repeating-linear-gradient(0deg,transparent,transparent 19px,#f3f3f3 19px,#f3f3f3 20px),repeating-linear-gradient(-90deg,transparent,transparent 19px,#f3f3f3 19px,#f3f3f3 20px);
  background-size: 200px 200px;
`

const Sidebar = styled.div`
  position: absolute;
  background: #fff;
  right: 0;
  top: 0;
  width: 300px;
  height: 100vh;
  
  box-shadow: none;
  transform: translateX(300px);

  &.on {
    box-shadow: 0 0 40px -5px rgba(0,0,0,0.1);
    transform: translateX(0px);
  }
`

const Controls = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  width: 100vw;
  height: 100vh;

  & * {
    pointer-events: auto;
  }
`

const ControlBar = styled.div`
  display: flex;
  max-width: 800px;
  margin: 10px auto;

  & h1 {
    flex: 0;
    margin: 0;
    padding: 10px 25px 10px 10px;
    font-size: 1.5em;

    & a {
      color: rgba(0,0,0,0.5);
      text-decoration: none;

      &:hover {
        color: #03a9f4;
      } 
    }
  }
`

const SearchBar = styled.div`
  background: #fff;
  box-shadow: 0 0 40px -5px rgba(0,0,0,0.1);
  display: flex;
  flex: 1;
  border-radius: 5px;

  & a {
    flex: 0 60px;
    padding: 5px 10px;
    text-align: center;
    margin: auto;
    cursor: pointer;
    border-left: 1px solid #eee;

    &:hover {
        color: #03a9f4;
    } 
  }
`

const Input = styled.input`
  flex: 1;
  padding: 11px 10px; 
  font-size: 1.05em;
  outline: none;
  border: none;
`

const Canvas = styled.canvas`
  width: 100vw;
  height: 100vh;
`

type Props = UserProps & RouteComponentProps

export class Core extends React.Component<Props> {
  public cl(e: React.SyntheticEvent<HTMLElement>) {
    console.log(e)
  }

  public render() {
    return (
      <Page>
        <Board>
          <Canvas onClick={this.cl} />
          <Controls>
            <ControlBar>
              <h1><Link to={HOME}>Tread</Link></h1>
              <SearchBar>
                <Input type="text" />
                <a onClick={doSignOut} >Sign out</a>
              </SearchBar>
            </ControlBar>
          </Controls>
          <Sidebar />
        </Board>
      </Page>
    )
  }
}

export const CorePage = withAuthorization<Props>(user => user ? true : false, AUTHENTICATE)(Core)