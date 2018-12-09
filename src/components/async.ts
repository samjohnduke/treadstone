import * as React from "react";

interface AsyncProps<T> {
  promise: Promise<T>;
  children(val: T): JSX.Element;
}

interface AsyncState<T> {
  val: T | undefined;
}

export class Async<T> extends React.Component<AsyncProps<T>, AsyncState<T>> {
  public state: AsyncState<T> = { val: undefined };

  constructor(p: AsyncProps<T>) {
    super(p);

    p.promise.then((val: T) => this.setState({ val }));
  }

  public render() {
    return this.state.val ? this.props.children(this.state.val) : null;
  }
}
