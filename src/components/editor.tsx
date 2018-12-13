import { Editor as ET } from "slate";
import { Editor } from "slate-react";

import Html from "slate-html-serializer";

import * as React from "react";
import styled from "src/styled";

import { isKeyHotkey } from "is-hotkey";

export const TreadstoneEditor = styled("div")``;

export const InnerEditor = styled(Editor)`
  margin-top: 10px;
  padding: 20px;
  background: #fff;
  box-shadow: 3px 3px 15px -2px rgba(0, 0, 0, 0.1);
`;

export const Button = styled("span")<{ active: boolean }>`
  cursor: pointer;
  color: ${p => (p.active ? "black" : "#ccc")};
  padding: 4px;
  border-radius: 4px;

  &:hover {
    background: #eee;
  }
`;

export const Icon = styled(({ className, ...rest }: any) => {
  return <span className={`material-icons ${className}`} {...rest} />;
})`
  font-size: 18px;
  vertical-align: text-bottom;
`;

export const Menu = styled("div")`
  & > * {
    display: inline-block;
  }
  & > * + * {
    margin-left: 8px;
  }
`;

export const Toolbar = styled(Menu)`
  position: sticky;
  top: 60px;
  padding: 10px;
  box-shadow: 3px 3px 15px -2px rgba(0, 0, 0, 0.1);
  background: #fff;
  z-index: 100;
`;

const BLOCK_TAGS = {
  blockquote: "quote",
  h1: "heading-one",
  h2: "heading-two",
  h3: "heading-three",
  li: "list-item",
  ol: "numbered-list",
  p: "paragraph",
  pre: "code",
  ul: "bulleted-list"
};

// Add a dictionary of mark tags.
const MARK_TAGS = {
  em: "italic",
  strong: "bold",
  u: "underlined"
};

const rules = [
  {
    deserialize(el: any, next: (node: any) => any) {
      const type = BLOCK_TAGS[el.tagName.toLowerCase()];
      if (type) {
        return {
          data: {
            className: el.getAttribute("class")
          },
          nodes: next(el.childNodes),
          object: "block",
          type
        };
      }
      return undefined;
    },
    serialize(obj: any, children: any) {
      if (obj.object === "block") {
        switch (obj.type) {
          case "code":
            return (
              <pre>
                <code>{children}</code>
              </pre>
            );
          case "paragraph":
            return <p className={obj.data.get("className")}>{children}</p>;
          case "quote":
            return <blockquote>{children}</blockquote>;
          case "heading-one":
            return <h1>{children}</h1>;
          case "heading-two":
            return <h2>{children}</h2>;
          case "heading-three":
            return <h3>{children}</h3>;
          case "bulleted-list":
            return <ul>{children}</ul>;
          case "numbered-list":
            return <ol>{children}</ol>;
          case "list-item":
            return <li>{children}</li>;
        }
      }
      return undefined;
    }
  },
  // Add a new rule that handles marks...
  {
    deserialize(el: any, next: (node: any) => any) {
      const type = MARK_TAGS[el.tagName.toLowerCase()];
      if (type) {
        return {
          nodes: next(el.childNodes),
          object: "mark",
          type
        };
      }
      return undefined;
    },
    serialize(obj: any, children: any) {
      if (obj.object === "mark") {
        switch (obj.type) {
          case "bold":
            return <strong>{children}</strong>;
          case "italic":
            return <em>{children}</em>;
          case "underlined":
            return <u>{children}</u>;
        }
      }
      return undefined;
    }
  }
];

const html = new Html({ rules });

/**
 * Define the default node type.
 *
 * @type {String}
 */

const DEFAULT_NODE = "paragraph";

/**
 * Define hotkey matchers.
 *
 * @type {Function}
 */

const isBoldHotkey = isKeyHotkey("mod+b");
const isItalicHotkey = isKeyHotkey("mod+i");
const isUnderlinedHotkey = isKeyHotkey("mod+u");
const isCodeHotkey = isKeyHotkey("mod+`");

interface Props {
  value: string;
  readOnly?: boolean;
  onChange?(value: string): void;
}

/**
 * The rich text example.
 *
 * @type {Component}
 */

class RichText extends React.Component<Props> {
  /**
   * Deserialize the initial editor value.
   *
   * @type {Object}
   */

  public state = {
    serial: "",
    value: html.deserialize("<p></p>")
  };

  public editor: ET | null;

  constructor(props: { value: string }) {
    super(props);

    this.state = {
      serial: props.value,
      value: html.deserialize(props.value)
    };
  }

  /**
   * Check if the current selection has a mark with `type` in it.
   *
   * @param {String} type
   * @return {Boolean}
   */

  public hasMark = (type: string) => {
    const { value } = this.state;
    return value.activeMarks.some(
      (mark: { type: string } | undefined) => mark!.type === type
    );
  };

  /**
   * Check if the any of the currently selected blocks are of `type`.
   *
   * @param {String} type
   * @return {Boolean}
   */

  public hasBlock = (type: string) => {
    const { value } = this.state;
    return value.blocks.some(
      (node: { type: string } | undefined) => node!.type === type
    );
  };

  /**
   * Store a reference to the `editor`.
   *
   * @param {Editor} editor
   */

  public ref = (editor: Editor) => {
    this.editor = editor as any;
  };

  /**
   * Render.
   *
   * @return {Element}
   */

  public render() {
    return (
      <TreadstoneEditor>
        <Toolbar>
          {this.renderMarkButton("bold", "format_bold")}
          {this.renderMarkButton("italic", "format_italic")}
          {this.renderMarkButton("underlined", "format_underlined")}
          {this.renderBlockButton("code", "code")}
          {this.renderBlockButton("heading-one", "looks_one")}
          {this.renderBlockButton("heading-two", "looks_two")}
          {this.renderBlockButton("heading-three", "looks_3")}
          {this.renderBlockButton("quote", "format_quote")}
          {this.renderBlockButton("numbered-list", "format_list_numbered")}
          {this.renderBlockButton("bulleted-list", "format_list_bulleted")}
        </Toolbar>
        <InnerEditor
          spellCheck={true}
          placeholder="Enter some rich text..."
          ref={this.ref}
          autoFocus={false}
          value={this.state.value}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          renderNode={this.renderNode}
          renderMark={this.renderMark}
          readOnly={this.props.readOnly}
        />
      </TreadstoneEditor>
    );
  }

  /**
   * Render a mark-toggling toolbar button.
   *
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */

  private renderMarkButton = (type: string, icon: string) => {
    const isActive = this.hasMark(type);

    return (
      <Button
        active={isActive}
        onMouseDown={event => this.onClickMark(event, type)}
      >
        <Icon>{icon}</Icon>
      </Button>
    );
  };

  /**
   * Render a block-toggling toolbar button.
   *
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */

  private renderBlockButton = (type: string, icon: string) => {
    let isActive = this.hasBlock(type) as boolean | null;

    if (["numbered-list", "bulleted-list"].includes(type)) {
      const {
        value: { document, blocks }
      } = this.state;

      if (blocks.size > 0) {
        const parent = document.getParent(blocks.first().key);

        isActive =
          this.hasBlock("list-item") &&
          parent &&
          (parent as { type: string }).type === type;
      }
    }

    return (
      <Button
        active={isActive as boolean}
        onMouseDown={event => this.onClickBlock(event, type)}
      >
        <Icon>{icon}</Icon>
      </Button>
    );
  };

  /**
   * Render a Slate node.
   *
   * @param {Object} props
   * @return {Element}
   */

  private renderNode = (props: any, editor: ET, next: () => any) => {
    const { attributes, children, node } = props;

    switch (node.type) {
      case "quote":
        return <blockquote {...attributes}>{children}</blockquote>;
      case "bulleted-list":
        return <ul {...attributes}>{children}</ul>;
      case "heading-one":
        return <h1 {...attributes}>{children}</h1>;
      case "heading-two":
        return <h2 {...attributes}>{children}</h2>;
      case "heading-three":
        return <h3 {...attributes}>{children}</h3>;
      case "list-item":
        return <li {...attributes}>{children}</li>;
      case "numbered-list":
        return <ol {...attributes}>{children}</ol>;
      case "code":
        return (
          <pre>
            <code>{children}</code>
          </pre>
        );
      default:
        return next();
    }
  };

  /**
   * Render a Slate mark.
   *
   * @param {Object} props
   * @return {Element}
   */

  private renderMark = (props: any, editor: ET, next: () => any) => {
    const { children, mark, attributes } = props;

    switch (mark.type) {
      case "bold":
        return <strong {...attributes}>{children}</strong>;
      case "code":
        return <code {...attributes}>{children}</code>;
      case "italic":
        return <em {...attributes}>{children}</em>;
      case "underlined":
        return <u {...attributes}>{children}</u>;
      default:
        return next();
    }
  };

  /**
   * On change, save the new `value`.
   *
   * @param {Editor} editor
   */

  private onChange = ({ value }: any) => {
    if (value.document !== this.state.value.document) {
      const str = html.serialize(value);
      if (this.props.onChange) {
        this.props.onChange(str);
      }
      this.setState({ serial: str, value });
    } else {
      this.setState({ value });
    }
  };

  /**
   * On key down, if it's a formatting command toggle a mark.
   *
   * @param {Event} event
   * @param {Editor} editor
   * @return {Change}
   */

  private onKeyDown = (event: any, editor: any, next: any) => {
    let mark;
    if (isBoldHotkey(event)) {
      mark = "bold";
    } else if (isItalicHotkey(event)) {
      mark = "italic";
    } else if (isUnderlinedHotkey(event)) {
      mark = "underlined";
    } else if (isCodeHotkey(event)) {
      mark = "code";
    } else if (event.key === "ArrowLeft") {
      return undefined;
    } else if (event.key === "ArrowRight") {
      return undefined;
    } else {
      const out = next();
      return out;
    }

    event.preventDefault();
    editor.toggleMark(mark);
  };

  /**
   * When a mark button is clicked, toggle the current mark.
   *
   * @param {Event} event
   * @param {String} type
   */

  private onClickMark = (event: any, type: string) => {
    event.preventDefault();
    (this.editor as any).toggleMark(type);
  };

  /**
   * When a block button is clicked, toggle the block type.
   *
   * @param {Event} event
   * @param {String} type
   */

  private onClickBlock = (event: any, type: string) => {
    event.preventDefault();

    const { editor } = this;
    const { value } = editor!;
    const { document } = value;

    // Handle everything but list buttons.
    if (type !== "bulleted-list" && type !== "numbered-list") {
      const isActive = this.hasBlock(type);
      const isList = this.hasBlock("list-item");

      if (isList) {
        (editor as any)
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock("bulleted-list")
          .unwrapBlock("numbered-list");
      } else {
        (editor as any).setBlocks(isActive ? DEFAULT_NODE : type);
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = this.hasBlock("list-item");
      const isType = value.blocks.some((block: any) => {
        return !!document.getClosest(
          block!.key,
          (parent: any) => parent.type === type
        );
      });

      if (isList && isType) {
        (editor as any)
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock("bulleted-list")
          .unwrapBlock("numbered-list");
      } else if (isList) {
        (editor as any)
          .unwrapBlock(
            type === "bulleted-list" ? "numbered-list" : "bulleted-list"
          )
          .wrapBlock(type);
      } else {
        (editor as any).setBlocks("list-item").wrapBlock(type);
      }
    }
  };
}

/**
 * Export.
 */

export default RichText;
