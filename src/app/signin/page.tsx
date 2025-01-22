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
import { getProviders, signIn, ClientSafeProvider } from "next-auth/react";

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
  const [providers, setProviders] = useState<Record<
    string,
    ClientSafeProvider
  > | null>(null);
  const [user, setUser] = useState(initialValues);
  const { login_email, login_password } = user;

  const fetchProviders = async () => {
    const response = await getProviders();
    setProviders(response);
  };

  React.useEffect(() => {
    fetchProviders();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <>
      <Header country="Canada" />
      <div className="flex flex-col items-center justify-center mt-10">
        {/* Back to Store Section */}
        <div className="mb-6">
          <div className="flex items-center justify-center space-x-4">
            <div className="p-4 rounded-full bg-white border-2 border-gray-300 shadow-md flex items-center justify-center">
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
          <div className="bg-white p-8 rounded-md shadow-lg w-full max-w-md">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">sign in</h1>
            <p className="text-gray-400 mb-6">
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
                    className="w-full bg-blue-500 text-white py-3 rounded-full mt-4 flex items-center justify-center hover:bg-blue-600 transition"
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
            {/* Social Login Section */}
            {providers && (
              <div className="mt-6">
                <div className="flex items-center">
                  <div className="border-t flex-grow border-gray-300"></div>
                  <span className="px-4 text-gray-500">Or continue with</span>
                  <div className="border-t flex-grow border-gray-300"></div>
                </div>
                <div className="flex flex-col space-y-4 mt-4">
                  {Object.values(providers).map((provider) => (
                    <button
                      key={provider.name}
                      onClick={() => signIn(provider.id)}
                      className="w-full flex items-center space-x-4 p-3 rounded-full border border-gray-300 shadow-sm hover:bg-gray-100 transition"
                    >
                      <img
                        src={`/icons/${provider.name.toLowerCase()}.png`}
                        alt={provider.name}
                        width={24}
                        height={24}
                        className="rounded-full"
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
        </div>
        <div className="w-full max-w-md"></div>
      </div>
      <Footer country="Canada" />
    </>
  );
}
