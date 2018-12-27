import { Link } from "@reach/router";
import * as React from "react";
import { List } from "../models/list";

export interface ListsProps {
  lists: List[];
}

export const Lists = ({ lists }: ListsProps) => {
  return (
    <ul>
      {lists.map(r => (
        <li key={r.key}>
          <Link to={r.key}>{r.name}</Link>
        </li>
      ))}
    </ul>
  );
};
