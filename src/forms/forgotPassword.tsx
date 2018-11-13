import { Link } from "@reach/router";
import { InjectedFormikProps, withFormik } from "formik";
import * as React from "react";

import { TextInput } from "src/components/textInput";
import { AUTHENTICATE, HOME, REGISTER } from "src/constants/routes";
import { Button } from "src/design/button";
import { Form, FormBar } from "src/design/form";

interface FormValues {
  email: string;
}

interface FormProps {
  email?: string;
}

class InnerForm extends React.Component<
  InjectedFormikProps<FormProps, FormValues>
> {
  public render() {
    return (
      <Form onSubmit={this.props.handleSubmit}>
        <h1>
          <Link to={HOME}>Treadstone</Link>
        </h1>
        <h2>Forgot your password?</h2>
        <h3>
          Enter your email address and we will send you an email to change it.
        </h3>
        <TextInput
          label="Email Address"
          type="email"
          name="email"
          value={this.props.values.email}
          onChange={this.props.handleChange}
          onBlur={this.props.handleBlur}
          errors={this.props.errors.email}
          touched={this.props.touched.email}
        />
        <FormBar>
          <div>
            <Button
              type="submit"
              disabled={this.props.isSubmitting || !this.props.isValid}
            >
              Send
            </Button>
          </div>
          <div>
            <Link to={REGISTER}>Register</Link>
            <Link to={AUTHENTICATE}>Login</Link>
          </div>
        </FormBar>
      </Form>
    );
  }
}

export const ForgotPassword = withFormik<FormProps, FormValues>({
  handleSubmit: (values, { setSubmitting }) => {
    //
  },
  mapPropsToValues: () => ({ email: "" }),
  validate: values => {
    const err: FormProps = {};

    const regex = new RegExp(".+@.+..+");

    if (values.email.trimLeft() === "") {
      console.log(values.email);
      err.email = "Email is required";
    } else if (!regex.test(values.email)) {
      err.email = "Invalid email address";
    }

    if (Object.keys(err).length === 0) {
      return undefined;
    }

    return err;
  }
})(InnerForm);
