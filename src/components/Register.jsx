import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Discover from "../pages/Discover";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/features/auth/authActions";

export const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sectionRef = useRef(null);

  const { isAuthenticated, loading, error, token } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("required"),
    password: Yup.string()
      .min(6, "Must be at least 6 characters")
      .required("Required"),
  });

  const handleSubmit = async (values) => {
    dispatch(registerUser(values));
  };

  return (
    <section
      className="flex flex-col items-center justify-center mt-20 animate-slideright"
      ref={sectionRef}
    >
      <div className="border-1 border-black p-[150px] bg-gradient-to-l from-black to-[#911986] rounded-3xl">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <>
              <h1 className="text-center text-3xl text-white">Register</h1>
              <Form className="flex flex-col gap-4 mt-4 w-80">
                <Field
                  name="name"
                  type="text"
                  placeholder="Name"
                  className="bg-black text-white p-3 mb-2 rounded-lg outline-none"
                />
                <ErrorMessage name="name" className="text-red-500" />
                <Field
                  name="email"
                  type="text"
                  placeholder="Email"
                  className="bg-black text-white p-3 mb-2 rounded-lg outline-none"
                />
                <ErrorMessage name="email" className="text-red-500" />
                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="bg-black text-white p-3 mb-2 rounded-lg outline-none"
                />
                <ErrorMessage name="password" className="text-red-500" />

                {error && <p className="text-red-500">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#ff4fd8] text-black p-3 rounded-lg outline-none"
                >
                  Register
                </button>
              </Form>
            </>
          )}
        </Formik>
      </div>
    </section>
  );
};
