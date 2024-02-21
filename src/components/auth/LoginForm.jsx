import React, { useContext } from "react";
import { Button, Card, Form } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { AuthContext } from "../../context/AuthContext";

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required().email(),
      password: Yup.string().min(6).required(),
    }),
    onSubmit: (vals) => {
      console.log("vals", vals);
      if (formik.isValid) {
        try {
          login({ email: vals.email, password: vals.password });
        } catch (error) {
          alert(error.message);
        }
      }
    },
  });

  return (
    <Card className="p-4 bg-light">
      <Form onSubmit={formik.handleSubmit}>
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

        <Button variant="primary" type="submit" className="d-block w-100">
          login
        </Button>
      </Form>
    </Card>
  );
};

export default LoginForm;
