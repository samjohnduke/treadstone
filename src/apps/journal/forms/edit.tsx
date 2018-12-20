import * as React from "react";
import { Journal } from "src/apps/journal/models/journal";
import RichText from "src/components/editor";
import { TextInput } from "src/components/textInput";

export interface EditProps {
  journal: Journal;
}

export interface EditState {
  content: string;
  tags: string;
  title: string;
}

export class EditJournalForm extends React.Component<EditProps, EditState> {
  public state: EditState;

  constructor(props: EditProps) {
    super(props);

    this.state = {
      content: props.journal.content,
      tags: props.journal.tags.join(", "),
      title: props.journal.title
    };
  }

  public componentDidMount() {
    setInterval(() => {
      //
    }, 1000);

    setInterval(() => {
      if (this.props.journal.content !== this.state.content) {
        this.props.journal.ref.update({
          content: this.state.content,
          tags: this.state.tags.split(",").map(t => t.trim())
        });
      }
    }, 3000);
  }

  public render() {
    return (
      <div>
        <TextInput
          key="jtitle"
          label="Title"
          name="title"
          type="text"
          value={this.state.title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            this.props.journal.ref.update({
              title: e.target.value
            });

            this.setState({
              title: e.target.value
            });
          }}
        />
        <div style={{ minHeight: "400px", width: "100%" }}>
          <RichText
            key="jcontent"
            onChange={v => {
              this.setState({
                content: v
              });
            }}
            value={this.state.content}
          />
        </div>
      </div>
    );
  }
}
