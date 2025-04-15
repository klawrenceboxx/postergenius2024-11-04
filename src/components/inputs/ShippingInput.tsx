"use client";

import { useField } from "formik";
import { InputHTMLAttributes } from "react";
import clsx from "clsx";

interface ShippingInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

export default function ShippingInput({
  name,
  label,
  ...props
}: ShippingInputProps) {
  const [field, meta] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <div className="w-full mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {props.required && <span className="text-red-500">*</span>}
      </label>
      <input
        {...field}
        {...props}
        id={name}
        className={clsx(
          "w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 transition",
          showError
            ? "border-red-500 focus:ring-red-300"
            : "border-gray-300 focus:ring-blue-300"
        )}
      />
      {showError && <p className="text-sm text-red-500 mt-1">{meta.error}</p>}
    </div>
  );
}
