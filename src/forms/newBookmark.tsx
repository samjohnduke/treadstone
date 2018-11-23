import { navigate } from "@reach/router";
import { InjectedFormikProps, withFormik } from "formik";
import * as React from "react";

import * as firebase from "firebase";

import { TextInput } from "src/components/textInput";
import { Alert } from "src/design/alert";
import { Button } from "src/design/button";
import { firestore } from "../firebase/firebase";

interface FormValues {
  name: string;
  tags: string;
  url: string;
  path: string;
}

interface FormProps {
  name?: string;
  path?: string;
  tags?: string;
  url?: string;
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
          value={this.props.values.url}
          onChange={this.props.handleChange}
          onBlur={this.props.handleBlur}
          errors={this.props.errors.url}
          touched={this.props.touched.url}
        />

        <TextInput
          label="Title"
          type="text"
          name="title"
          value={this.props.values.name}
          onChange={this.props.handleChange}
          onBlur={this.props.handleBlur}
          errors={this.props.errors.name}
          touched={this.props.touched.name}
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

        <TextInput
          label="Tags"
          name="tags"
          type="text"
          value={this.props.values.path}
          onChange={this.props.handleChange}
          onBlur={this.props.handleBlur}
          errors={this.props.errors.path}
          touched={this.props.touched.path}
        />

        <div>
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
      .collection("bookmarks")
      .add({
        createdAt: firebase.firestore.Timestamp.now(),
        path: values.path,
        tags: values.tags.split(",").map(t => t.trim()),
        title: values.name,
        url: values.url
      })
      .then(a => navigate(`./${a.id}/edit`));
  },
  mapPropsToValues: () => ({ name: "", path: "", url: "", tags: "" }),
  validate: values => {
    const err: FormProps = {};

    if (Object.keys(err).length === 0) {
      return undefined;
    }

    return err;
  }
})(InnerForm);
