import { InjectedFormikProps, withFormik } from "formik";
import * as React from "react";

import { TextInput } from "src/components/textInput";
import { Alert } from "src/design/alert";
import { Button } from "src/design/button";

interface FormValues {
  name: string;
}

interface FormProps {
  name?: string;
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

export const NewProjectForm = withFormik<FormProps, FormValues>({
  handleSubmit: (values, { setSubmitting, setStatus, props }) => {
    setSubmitting(true);
  },
  mapPropsToValues: () => ({ name: "" }),
  validate: values => {
    const err: FormProps = {};

    if (Object.keys(err).length === 0) {
      return undefined;
    }

    return err;
  }
})(InnerForm);
