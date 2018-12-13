import { navigate } from "@reach/router";
import { InjectedFormikProps, withFormik } from "formik";
import * as React from "react";

import * as firebase from "firebase";

import RichText from "src/components/editor";
import { TextInput } from "src/components/textInput";
import { Alert } from "src/design/alert";
import { Button } from "src/design/button";
import { firestore } from "../../../firebase/firebase";

interface FormValues {
  title: string;
  tags: string;
  content: string;
}

interface FormProps {
  title?: string;
  tags?: string;
  content?: string;
}

class InnerForm extends React.Component<
  InjectedFormikProps<FormProps, FormValues>
> {
  public render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        {this.props.status ? <Alert>{this.props.status}</Alert> : null}

        <TextInput
          label="Title"
          type="text"
          name="title"
          value={this.props.values.title}
          onChange={this.props.handleChange}
          onBlur={this.props.handleBlur}
          errors={this.props.errors.title}
          touched={this.props.touched.title}
        />

        <TextInput
          label="Tags"
          name="tags"
          type="text"
          value={this.props.values.tags}
          onChange={this.props.handleChange}
          onBlur={this.props.handleBlur}
          errors={this.props.errors.tags}
          touched={this.props.touched.tags}
        />

        <div style={{ padding: "0 0 20px", width: "100%" }}>
          <RichText
            onChange={v => this.props.setFieldValue("content", v)}
            value={this.props.values.content}
          />
        </div>

        <div>
          <Button
            style={{ background: "#444", color: "#fff", marginRight: 20 }}
            type="button"
            onClick={() => window.history.go(-1)}
          >
            Back
          </Button>
          <Button
            type="submit"
            disabled={this.props.isSubmitting || !this.props.isValid}
          >
            Go
          </Button>
        </div>
      </form>
    );
  }
}

export const NewJournalForm = withFormik<FormProps, FormValues>({
  handleSubmit: (values, { setSubmitting, setStatus, props }) => {
    setSubmitting(true);
    firestore
      .collection("/users")
      .doc("BMRvH9myrxZdrRQd82HmlJIriJy1")
      .collection("journal")
      .add({
        content: values.content,
        createdAt: firebase.firestore.Timestamp.now(),
        tags: values.tags.split(",").map(t => t.trim()),
        title: values.title
      })
      .then(a => navigate(`./${a.id}/edit`));
  },
  mapPropsToValues: () => ({ title: "", content: "", tags: "" }),
  validate: values => {
    const err: FormProps = {};

    if (Object.keys(err).length === 0) {
      return undefined;
    }

    return err;
  }
})(InnerForm);
