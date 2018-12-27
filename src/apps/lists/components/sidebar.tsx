import * as React from "react";
import { List } from "../models/list";
import { ListProps, withLists } from "../withLists";
import { Lists } from "./lists";
import { NewList } from "./newList";

interface Props {
  lists?: List[];
  create(name: string): Promise<string>;
}

export type SidebarProps = ListProps & Props;

interface SidebarState {
  newOpen: boolean;
}

@withLists
export class Sidebar extends React.Component<SidebarProps, SidebarState> {
  public state: SidebarState = {
    newOpen: false
  };

  public render() {
    return (
      <>
        <NewList
          showing={this.state.newOpen}
          close={() => this.setState({ newOpen: false })}
          create={this.props.create}
        />
        <div style={{ flex: 1, display: "flex" }}>
          <h2 style={{ flex: 1 }}>Lists</h2>
          <i
            onClick={() =>
              this.setState({
                newOpen: true
              })
            }
            className="material-icons"
          >
            add
          </i>
        </div>
        <Lists lists={this.props.lists || []} />
      </>
    );
  }
}
