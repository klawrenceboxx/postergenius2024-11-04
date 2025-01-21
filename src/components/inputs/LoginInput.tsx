import React from "react";
import { useField } from "formik";
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
    if (icon === "user") return <BiUser className="text-xl" />;
    if (icon === "email") return <SiMinutemailer className="text-xl" />;
    if (icon === "password") return <IoKeyOutline className="text-xl" />;
    return null;
  };

  const inputError =
    meta.touched && meta.error ? "border-red-500" : "border-gray-300";

  return (
    <div className="flex items-center border p-2 rounded-md mb-3">
      <div className="mr-2">{renderIcon()}</div>
      <input
        {...field} // includes { name, value, onBlur, onChange }
        {...props} // includes e.g. type="text", placeholder, etc.
        className={`flex-1 outline-none border-b-2 ${inputError}`}
      />
      {/* If there's a validation error, you might display it below or in a tooltip */}
    </div>
  );
}
