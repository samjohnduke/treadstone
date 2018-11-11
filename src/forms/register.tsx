import { Link } from '@reach/router';
import { InjectedFormikProps, withFormik } from 'formik';
import * as React from 'react';

import { TextInput } from 'src/components/textInput';
import { AUTHENTICATE, FORGOTTEN_PASSWORD, HOME } from 'src/constants/routes';
import { Button } from 'src/design/button';
import { Form, FormBar } from 'src/design/form';
import { doCreateUserWithEmailAndPassword } from 'src/firebase/auth';

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

interface FormProps {
  name?: string;
  email?: string;
  password?: string;
  confirm_password?: string;
}

class InnerForm extends React.Component<InjectedFormikProps<FormProps, FormValues>> {
  public render() {

    return (
      <Form onSubmit={this.props.handleSubmit}>
        <h1><Link to={HOME}>Tread</Link></h1>
        <h2>Register to get started for free!</h2>
        <h3>Its the beginning of something new</h3>
        
        <TextInput 
          label="Name" 
          type="text" 
          name="name" 
          value={this.props.values.name} 
          onChange={this.props.handleChange} 
          touched={this.props.touched.name}
          errors={this.props.errors.name}
          onBlur={this.props.handleBlur} 
        />

        <TextInput 
          label="Email Address" 
          type="email" 
          name="email" 
          value={this.props.values.email} 
          onChange={this.props.handleChange} 
          errors={this.props.errors.email}
          touched={this.props.touched.email}
          onBlur={this.props.handleBlur} 
        />
       
        <TextInput 
          label="Password" 
          type="password" 
          name="password" 
          value={this.props.values.password} 
          onChange={this.props.handleChange}
          touched={this.props.touched.password} 
          errors={this.props.errors.password}
          onBlur={this.props.handleBlur} 
        />
        
        <TextInput 
          label="Confirm Password" 
          type="password" 
          name="confirm_password" 
          value={this.props.values.confirm_password} 
          touched={this.props.touched.confirm_password}
          onChange={this.props.handleChange} 
          onBlur={this.props.handleBlur} 
          errors={this.props.errors.confirm_password}
        />
        
        <FormBar>
          <div>
            <Button type="submit" disabled={(this.props.isSubmitting || !this.props.isValid)}>Register</Button>
          </div> 
          <div>
            <Link to={AUTHENTICATE} >login</Link>
            <Link to={FORGOTTEN_PASSWORD}>Forgot password?</Link>
          </div> 
        </FormBar>
      </Form>
    )
  }
}

interface RegisterErrors {
  name?: string
  email?: string
  password?: string
  confirm_password?: string
}
 
export const Register = withFormik<FormProps, FormValues>({
  handleSubmit: (values, { setSubmitting, setStatus }) => {

    doCreateUserWithEmailAndPassword(values.email, values.password)
      .then(creds => {
        //
        console.log(creds)
        setSubmitting(false)
      })
      .catch(e => {
        switch(e.code) {
        case "auth/email-already-in-use":
          setStatus("A user exists with this email already")
          break;
        case "auth/invalid-email":
          setStatus("You have entered an email address that is not valid")
          break;
        case "auth/operation-not-allowed":
          setStatus("An error has occurred, please try again")
          break;
        case "auth/weak-password":
          setStatus("Your password is too weak, please make it stronger")
          break;
        }
        
      })

  },
  mapPropsToValues: () => ({ email: '', password: '', name: '', confirm_password: '' }),
  validate: (values) => {
    const errs: RegisterErrors = {}

    const regex = new RegExp('.+\@.+\..+')

    if (values.email.trimLeft() === "") {

      errs.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errs.email = "Invalid email address";
    }

    if(values.confirm_password !== values.password) {
      errs.confirm_password = "Passwords do not match"
    }

    if(values.password.length < 8) {
      errs.password = "Minimum password length is 8"
    }

    if(Object.keys(errs).length === 0) {
      return undefined
    }

    return errs
  },
  validateOnBlur: true,
  validateOnChange: true,
})(InnerForm); 