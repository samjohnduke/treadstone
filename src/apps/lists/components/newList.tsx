import * as React from "react";

import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
import VisuallyHidden from "@reach/visually-hidden";

import styled from "src/styled";

export interface NewListProps {
  showing: boolean;
  close(): void;
}

interface NewListState {
  name: string;
}

const Button = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 10000;
  font-size: 10px;

  background: #fff;
  border: none;
  padding: 2px;
`;

export class NewList extends React.Component<NewListProps, NewListState> {
  public state: NewListState = {
    name: ""
  };

  public componentDidMount() {
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") {
        this.props.close();
      }
    });
  }

  public render() {
    const { showing, close } = this.props;

    return (
      <Dialog style={{ position: "relative" }} isOpen={showing}>
        <Button className="close-button" onClick={close}>
          <VisuallyHidden>Close</VisuallyHidden>
          <i aria-hidden={true} className="material-icons">
            close
          </i>
        </Button>
        <>
          <input
            type="text"
            name="listname"
            placeholder="List name"
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
          />
          <button onClick={() => this.create()}>create</button>
        </>
      </Dialog>
    );
  }

  private create() {
    const { name } = this.state;
    console.log(name);
  }
}
