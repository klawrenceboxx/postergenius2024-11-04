"use client";

import React, { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import LoginInput from "@/components/inputs/LoginInput";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { BiLeftArrowAlt } from "react-icons/bi";
import Link from "next/link";

interface LoginValues {
  login_email: string;
  login_password: string;
}

const initialValues = {
  login_email: "",
  login_password: "",
};

const loginValidation = Yup.object({
  login_email: Yup.string()
    .required("Email address is required.")
    .email("Please enter a valid email addres."),
  login_password: Yup.string().required("Please enter a password"),
});

export default function signin() {
  const [user, setUser] = useState(initialValues);
  const { login_email, login_password } = user;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  console.log(user);

  return (
    <>
      <Header country="Canada" />
      <div className="flex flex-col items-center justify-center mt-10">
        <div className="flex items-center space-x-4 mb-6">
          <div className="p-4 rounded-full  bg-white border-2 border-slate-300 flex items-center justify-center">
            <div>
              <BiLeftArrowAlt className="text-xl text-gray-700 " />
            </div>
            <span className="text-lg font-medium text-gray-700">
              We'd be happy to join us !{" "}
              <Link
                href="/"
                className="text-blue-500 underline hover:text-blue-600"
              >
                Go Store
              </Link>
            </span>
          </div>
          <div>
            <h1>sign in</h1>
            <p>
              Get acceess to one of the best Eshopping services in the world.
            </p>
            <Formik
              enableReinitialize
              initialValues={initialValues}
              validationSchema={loginValidation}
              // We must define onSubmit to remove the "Property 'onSubmit' is missing" error
              onSubmit={(values) => {
                // This is where you'd handle the form submission, e.g., call an API
                console.log("Formik values:", values);
              }}
            >
              {(form) => (
                <Form>
                  <LoginInput
                    type="text"
                    name="login_email"
                    icon="email"
                    placeholder="Email Address"
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="password"
                    name="login_password"
                    icon="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <div className="w-full max-w-md"></div>
      </div>
      <Footer country="Canada" />
    </>
  );
}
