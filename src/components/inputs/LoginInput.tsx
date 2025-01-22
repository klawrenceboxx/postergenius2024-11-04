"use client";

import React from "react";
import { useField, ErrorMessage } from "formik";
import { BiUser } from "react-icons/bi";
import { SiMinutemailer } from "react-icons/si";
import { IoKeyOutline } from "react-icons/io5";

interface LoginInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: "user" | "email" | "password"; // Define the type for the icon prop
  placeholder: string;
}

export default function LoginInput({ icon, ...props }: LoginInputProps) {
  const [field, meta] = useField({ name: props.name! });

  // Determine which icon to render
  const renderIcon = () => {
    if (icon === "user") return <BiUser className="text-gray-400 text-xl" />;
    if (icon === "email")
      return <SiMinutemailer className="text-gray-400 text-xl" />;
    if (icon === "password")
      return <IoKeyOutline className="text-gray-400 text-xl" />;
    return null;
  };

  const inputError =
    meta.touched && meta.error ? "border-red-500" : "border-gray-300";

  return (
    <div className="mb-4">
      <div className="flex items-center border rounded-full bg-gray-100 px-4 py-3">
        {renderIcon()}
        <input
          {...field} // includes { name, value, onBlur, onChange }
          {...props} // includes e.g. type="text", placeholder, etc.
          className="ml-3 bg-transparent flex-1 outline-none text-gray-700 placeholder-gray-400"
        />
      </div>

      {meta.touched && meta.error && (
        <div className="text-red-500 text-sm mt-1">
          <ErrorMessage name={field.name} />
        </div>
      )}
    </div>
  );
}
