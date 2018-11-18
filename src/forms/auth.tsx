import { Link, LocationContext } from "@reach/router";
import { InjectedFormikProps, withFormik } from "formik";
import { History } from "history";
import * as React from "react";

import { TextInput } from "src/components/textInput";
import { APP, FORGOTTEN_PASSWORD, HOME, REGISTER } from "src/constants/routes";
import { Alert } from "src/design/alert";
import { Button } from "src/design/button";
import { Form, FormBar } from "src/design/form";
import { doSignInWithEmailAndPassword } from "src/firebase/auth";
import { withAuthorization } from "src/firebase/withAuthorisation";

interface FormValues {
  email: string;
  password: string;
}

interface FormProps {
  user?: any;
  email?: string;
  password?: string;
}

type AllFormProps = FormProps & { history: History; location: LocationContext };

class InnerForm extends React.Component<
  InjectedFormikProps<AllFormProps, FormValues>
> {
  public render() {
    return (
      <Form onSubmit={this.props.handleSubmit}>
        <h1>
          <Link to={HOME}>Treadstone</Link>
        </h1>
        <h2>Welcome Back!</h2>
        <h3>Login to get started</h3>

        {this.props.status ? <Alert>{this.props.status}</Alert> : null}

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

        <TextInput
          label="Password"
          type="password"
          name="password"
          value={this.props.values.password}
          onChange={this.props.handleChange}
          onBlur={this.props.handleBlur}
          errors={this.props.errors.password}
          touched={this.props.touched.password}
        />

        <FormBar>
          <div>
            <Button
              type="submit"
              disabled={this.props.isSubmitting || !this.props.isValid}
            >
              Go
            </Button>
          </div>
          <div>
            <Link to={REGISTER}>Register</Link>
            <Link to={FORGOTTEN_PASSWORD}>Forgot password?</Link>
          </div>
        </FormBar>
      </Form>
    );
  }
}

export const Auth = withAuthorization(user => (user ? false : true), APP)(
  withFormik<AllFormProps, FormValues>({
    handleSubmit: (values, { setSubmitting, setStatus, props }) => {
      setSubmitting(true);
      doSignInWithEmailAndPassword(values.email, values.password)
        .then(user => {
          console.log(user);
          setSubmitting(false);
          props.location.navigate("/core");
        })
        .catch(e => {
          switch (e.code) {
            case "auth/user-not-found":
              setStatus("A user does not exist with that email address");
              break;
            case "auth/invalid-email":
              setStatus("Make sure you enter a valid email address");
              break;
            case "auth/user-disabled":
              setStatus("Your account has been disabled");
              break;
            case "auth/wrong-password":
              setStatus("The password does not match for that email address");
              break;
          }
          setSubmitting(false);
        });
    },
    mapPropsToValues: () => ({ email: "", password: "" }),
    validate: values => {
      const err: FormProps = {};

      const regex = new RegExp(".+@.+..+");

      if (values.email.trimLeft() === "") {
        console.log(values.email);
        err.email = "Email is required";
      } else if (!regex.test(values.email)) {
        err.email = "Invalid email address";
      }

      if (values.password.length < 8) {
        err.password = "Minimum password length is 8";
      }

      if (Object.keys(err).length === 0) {
        return undefined;
      }

      return err;
    }
  })(InnerForm)
);
