"use client";

import React, { startTransition, useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoginInput from "@/components/inputs/LoginInput";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { BiLeftArrowAlt } from "react-icons/bi";
import Link from "next/link";
import Button1 from "@/components/buttons/Button1";
import { getProviders, signIn, ClientSafeProvider } from "next-auth/react";

interface LoginValues {
  login_email: string;
  login_password: string;
  name: string;
  email: string;
  password: string;
  conf_password: string;
}

const initialValues = {
  login_email: "",
  login_password: "",
  name: "",
  email: "",
  password: "",
  conf_password: "",
};

// Validation for Login Form
const loginValidation = Yup.object({
  login_email: Yup.string()
    .required("Email address is required.")
    .email("Please enter a valid email addres."),
  login_password: Yup.string().required("Please enter a password"),
});

// Validation for Sign-Up Form
const signupValidation = Yup.object({
  name: Yup.string()
    .required("What's your name?")
    .min(2, "Name must be at least 2 characters")
    .max(16, "Name must be at most 16 characters")
    .matches(
      /^[A-Za-z\s]+$/,
      "Numbers and special characters are not allowed."
    ),
  email: Yup.string()
    .required("Email address is required.")
    .email("Enter a valid email address."),
  password: Yup.string()
    .required("Password is required.")
    .min(6, "Password must be at least 6 characters long.")
    .matches(/(?=.*[0-9])/, "Password must contain at least one number."),
  conf_password: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password."),
});

export default function signin() {
  const [providers, setProviders] = useState<Record<
    string,
    ClientSafeProvider
  > | null>(null);

  const [user, setUser] = useState(initialValues);
  const { login_email, login_password, name, email, password, conf_password } =
    user;

  const fetchProviders = async () => {
    const response: Record<string, ClientSafeProvider> | null =
      await getProviders();
    setProviders(response);
  };

  // Fetch providers on mount
  useEffect(() => {
    startTransition(() => {
      fetchProviders();
    });
  }, []);

  const filteredProviders = Object.values(providers || {}).filter(
    (provider) => provider.id !== "credentials"
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <>
      <Header country="Canada" />
      <div className="flex items-center justify-center mt-10 ">
        {/* Back to Store Section */}
        <div className="w-full max-w-md mb-6 px-4">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 rounded-full bg-white border shadow-md">
              <BiLeftArrowAlt className="text-2xl text-gray-700" />
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
          <div className="bg-white p-8 rounded-md shadow-lg w-full max-w-md mb-4">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">Sign in</h1>
            <p className="text-gray-400 mb-6">
              Get acceess to one of the best Eshopping services in the world.
            </p>
            <Formik
              enableReinitialize
              initialValues={{
                login_email,
                login_password,
              }}
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
                    className="w-full bg-blue-500 text-white py-3 rounded-full mt-4 flex items-center justify-center hover:bg-blue-600 transition"
                  />

                  {/* Forgot Password */}
                  <div className="mt-4 text-left">
                    <Link
                      href="/forget"
                      className="text-sm text-blue-500 hover:text-blue-600"
                    >
                      forgot password?
                    </Link>
                  </div>
                </Form>
              )}
            </Formik>
            {/* Social Login Section */}
            {providers && (
              <div className="mt-6">
                <div className="flex items-center">
                  <div className="border-t flex-grow border-gray-300"></div>
                  <span className="px-4 text-gray-500">Or continue with</span>
                  <div className="border-t flex-grow border-gray-300"></div>
                </div>
                <div className="flex flex-col space-y-4 mt-4">
                  {filteredProviders.map((provider) => (
                    <button
                      key={provider.name}
                      onClick={() => signIn(provider.id)}
                      aria-label={`Sign in with ${provider.name}`}
                      className="flex items-center space-x-4 p-3 rounded-full border border-gray-300 shadow-sm hover:bg-gray-100 hover:scale-105 transition"
                    >
                      <img
                        src={`/icons/${provider.name.toLowerCase()}.png`}
                        alt={provider.name}
                        className="w-6 h-6 mr-2"
                        onError={(e) =>
                          (e.currentTarget.src = "/icons/default.png")
                        }
                      />
                      <span className="text-gray-700 font-medium">
                        Sign in with {provider.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="w-full max-w-md"></div>
        </div>
        {/* Sign Up */}
        <div className="w-full max-w-md mb-6 px-4">
          {/* Sign-In Form */}
          <div className="bg-white p-8 rounded-md shadow-lg w-full max-w-md mb-4">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">Sign up</h1>
            <p className="text-gray-400 mb-6">Join Today!</p>
            <Formik
              enableReinitialize
              initialValues={{
                name,
                email,
                password,
                conf_password,
              }}
              validationSchema={signupValidation}
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
                    name="name"
                    icon="user"
                    placeholder="Full Name"
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="text"
                    name="email"
                    icon="email"
                    placeholder="Email Address"
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="password"
                    name="password"
                    icon="password"
                    placeholder="password"
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="password"
                    name="conf_password"
                    icon="password"
                    placeholder="Re-Type Password"
                    onChange={handleChange}
                  />
                  {/* Submit Button */}
                  <Button1
                    type="submit"
                    text="Sign Up"
                    className="w-full bg-blue-500 text-white py-3 rounded-full mt-4 flex items-center justify-center hover:bg-blue-600 transition"
                  />
                </Form>
              )}
            </Formik>
          </div>
          <div className="w-full max-w-md"></div>
        </div>
      </div>
      <Footer country="Canada" />
    </>
  );
}
