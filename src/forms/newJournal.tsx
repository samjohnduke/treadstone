import { navigate } from "@reach/router";
import { InjectedFormikProps, withFormik } from "formik";
import * as React from "react";

import { TextInput } from "src/components/textInput";
import { Alert } from "src/design/alert";
import { Button } from "src/design/button";
import { firestore } from "../firebase/firebase";

interface FormValues {
  title: string;
}

interface FormProps {
  title?: string;
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
      .collection("journal")
      .add({ title: values.title })
      .then(() => navigate("./"));
  },
  mapPropsToValues: () => ({ title: "" }),
  validate: values => {
    const err: FormProps = {};

    if (Object.keys(err).length === 0) {
      return undefined;
    }

    return err;
  }
})(InnerForm);
