import { Record } from "immutable";

export const Todo = Record({
  color: "white",
  completedAt: undefined,
  content: "",
  createdAt: Date.now(),
  dueAt: undefined,
  id: -1,
  ownerId: -1,
  tags: []
});
