import React, { useContext } from "react";
import { Button, Card, Form } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { AuthContext } from "../../context/AuthContext";

const SignUpForm = () => {
  const { signup } = useContext(AuthContext);

  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      approved: false,
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required(),
      email: Yup.string().required().email(),
      password: Yup.string().min(6).required(),
      confirmPassword: Yup.string()
        .required()
        .oneOf([Yup.ref("password")], "not equal to password"),
      approved: Yup.boolean().oneOf([true], "required"),
    }),
    onSubmit: (vals) => {
      console.log("vals", vals);
      if (formik.isValid) {
        try {
          signup({ email: vals.email, password: vals.password });
        } catch (error) {
          alert(error.message);
        }
      }
    },
  });

  return (
    <Card className="p-4 bg-light">
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicUsename">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
            isInvalid={formik.errors.username && formik.touched.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.username && formik.touched.username ? (
            <Form.Text className="text-danger">
              {formik.errors.username}
            </Form.Text>
          ) : null}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            isInvalid={formik.errors.email && formik.touched.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email ? (
            <Form.Text className="text-danger">{formik.errors.email}</Form.Text>
          ) : null}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            isInvalid={formik.errors.password && formik.touched.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password ? (
            <Form.Text className="text-danger">
              {formik.errors.password}
            </Form.Text>
          ) : null}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="confirmPassword"
            isInvalid={
              formik.errors.confirmPassword && formik.touched.confirmPassword
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
            <Form.Text className="text-danger">
              {formik.errors.confirmPassword}
            </Form.Text>
          ) : null}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="I've reed terms and conditions"
            name="approved"
            isInvalid={formik.errors.approved && formik.touched.approved}
            onChange={formik.handleChange}
          />
          {formik.errors.approved && formik.touched.approved ? (
            <Form.Text className="text-danger">
              {formik.errors.approved}
            </Form.Text>
          ) : null}
        </Form.Group>
        <Button variant="primary" type="submit" className="d-block w-100">
          signup
        </Button>
      </Form>
    </Card>
  );
};

export default SignUpForm;
