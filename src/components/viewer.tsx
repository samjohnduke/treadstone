import { Editor as ET } from "slate";
import { Editor } from "slate-react";

import Html from "slate-html-serializer";

import * as React from "react";
import styled from "src/styled";

export const TreadstoneEditor = styled("div")``;

export const InnerEditor = styled(Editor)`
  font-size: 18px;

  & h2 {
    font-size: 1.6em;
  }

  & h3 {
    font-size: 1.3em;
  }
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
 * The rich text example.
 *
 * @type {Component}
 */

class RichTextView extends React.Component<{
  value: string;
  readOnly?: boolean;
}> {
  /**
   * Deserialize the initial editor value.
   *
   * @type {Object}
   */

  public state = {
    value: html.deserialize("<p></p>")
  };

  public editor: ET | null;

  constructor(props: { value: string }) {
    super(props);
    this.state = {
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
    console.log();
    return (
      <TreadstoneEditor>
        <InnerEditor
          ref={this.ref}
          value={this.state.value}
          renderNode={this.renderNode}
          renderMark={this.renderMark}
          readOnly={this.props.readOnly}
        />
      </TreadstoneEditor>
    );
  }

  /**
   * Render a Slate node.
   *
   * @param {Object} props
   * @return {Element}
   */

  private renderNode = (props: any, editor: ET, next: () => any) => {
    const { attributes, children, node } = props;

    switch (node.type) {
      case "paragraph":
        return <p>{children}</p>;
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
}

/**
 * Export.
 */

export default RichTextView;
