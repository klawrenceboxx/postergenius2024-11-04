"use client";

import React, { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import LoginInput from "@/components/inputs/LoginInput";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { BiLeftArrowAlt } from "react-icons/bi";
import Link from "next/link";
import Button1 from "@/components/buttons/Button1";

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

          {/* Sign-In Form */}
          <div className="bg-white p-8 rounded-md shadow-lg w-full max-w-md">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">sign in</h1>
            <p className="text-gray-500 mb-6">
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

                  {/* Submit Button */}
                  <Button1
                    type="submit"
                    text="Sign In"
                    className="w-full bg-blue-500 text-white py-3 rounded-md mt-4 flex items-center justify-center hover:bg-blue-600 transition"
                  />

                  {/* Forgot Password */}
                  <div className="mt-4 text-center">
                    <Link
                      href="/forget"
                      className="text-sm text-blue-500 hover:text-blue-600"
                    >
                      Forgot password?
                    </Link>
                  </div>
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
