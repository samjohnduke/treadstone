import { navigate } from "@reach/router";
import { InjectedFormikProps, withFormik } from "formik";
import * as React from "react";

import { TextInput } from "src/components/textInput";
import { Alert } from "src/design/alert";
import { Button } from "src/design/button";

import { firestore as FS } from "firebase/app";

import { firestore } from "../firebase/firebase";

interface FormValues {
  name: string;
  url: string;
}

interface FormProps {
  name?: string;
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
          label="Name"
          type="text"
          name="name"
          value={this.props.values.name}
          onChange={this.props.handleChange}
          onBlur={this.props.handleBlur}
          errors={this.props.errors.name}
          touched={this.props.touched.name}
        />

        <TextInput
          label="URL"
          type="text"
          name="url"
          value={this.props.values.url}
          onChange={this.props.handleChange}
          onBlur={this.props.handleBlur}
          errors={this.props.errors.url}
          touched={this.props.touched.url}
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

export const NewFeedForm = withFormik<FormProps, FormValues>({
  handleSubmit: (values, { setSubmitting, setStatus, props }) => {
    setSubmitting(true);
    firestore
      .collection("/users")
      .doc("BMRvH9myrxZdrRQd82HmlJIriJy1")
      .collection("feeds")
      .add({
        createdAt: FS.Timestamp.now(),
        name: values.name,
        url: values.url
      })
      .then(() => navigate("./"));
  },
  mapPropsToValues: () => ({ name: "", url: "" }),
  validate: values => {
    const err: FormProps = {};

    if (Object.keys(err).length === 0) {
      return undefined;
    }

    return err;
  }
})(InnerForm);
