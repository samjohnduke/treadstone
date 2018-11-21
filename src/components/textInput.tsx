import * as React from "react";
import styled from "src/styled";

const InputGroup = styled.div`
  background: #fff;
  padding: 0;
  box-shadow: 3px 3px 15px -2px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  margin: 0 0 10px 0;
  position: relative;
  border: 2px solid transparent;
  transition: border 0.3s, color 0.3s;

  &.focus {
    border: 2px solid #03a9f4;

    label {
      top: 4px;
      left: 10px;
      font-size: 0.8em;
      color: #03a9f4;
    }
  }

  &.hasValue {
    label {
      top: 4px;
      left: 10px;
      font-size: 0.8em;
    }
  }

  & label {
    pointer-events: none;
    position: absolute;
    top: 16px;
    left: 15px;
    display: block;
    font-size: 1em;
    font-weight: 700;
    color: rgba(0, 0, 0, 0.7);
    transition: top 0.2s, left 0.2s, font-size 0.2s;
  }

  & input {
    display: block;
    width: calc(100% - 20px);
    border: none;
    border-radius: 3px;
    padding: 23px 10px 10px;
    font-size: 1em;
    outline: none;
  }
`;

const Error = styled.div`
  background: rgba(255, 0, 0, 0.1);
  padding: 4px 10px;
  font-size: 0.9em;
`;

interface TextInputProps {
  label: string;
  value: string;
  type: string;
  name: string;
  touched?: boolean;
  errors?: string | string[] | undefined;
  onChange?(e: React.ChangeEvent<any>): void;
  onBlur?(e: React.ChangeEvent<any>): void;
}

interface TextInputState {
  focus: boolean;
}

export class TextInput extends React.Component<TextInputProps, TextInputState> {
  constructor(props: TextInputProps) {
    super(props);
    this.state = {
      focus: false
    };
    this.focus = this.focus.bind(this);
    this.blur = this.blur.bind(this);
  }

  public render() {
    const classList: string[] = [] as string[];

    if (this.state.focus) {
      classList.push("focus");
    }
    if (this.props.value !== "") {
      classList.push("hasValue");
    }

    const hasErr =
      this.props.errors !== undefined &&
      this.props.errors !== null &&
      this.props.errors !== "" &&
      (this.props.touched || this.props.value !== "");

    return (
      <InputGroup
        className={classList.join(" ")}
        onFocus={this.focus}
        onBlur={this.blur}
      >
        <label>{this.props.label}</label>
        <input
          type={this.props.type}
          name={this.props.name}
          value={this.props.value}
          onInput={this.props.onChange}
          onChange={this.props.onChange}
          onBlur={this.blur}
        />

        {hasErr ? <Error>{this.props.errors}</Error> : null}
      </InputGroup>
    );
  }

  private focus(e: React.SyntheticEvent<Element>) {
    this.setState({ focus: true });
  }

  private blur(e: React.SyntheticEvent<Element>) {
    this.setState({ focus: false });
    const { onBlur } = this.props;

    if (onBlur) {
      onBlur(e);
    }
  }
}
