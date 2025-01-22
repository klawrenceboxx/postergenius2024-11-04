import { BiRightArrowAlt } from "react-icons/bi";

interface Button1Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  icon?: React.ReactNode;
}

export default function Button1({
  type = "button",
  text,
  icon,
  ...props
}: Button1Props) {
  return (
    <button
      type={type}
      {...props}
      className="flex items-center justify-center bg-blue-500 text-white py-3 px-6 rounded-full hover:bg-blue-600 transition shadow-md"
    >
      {" "}
      {text}
      <span className="inline-block ml-2">
        {icon ?? <BiRightArrowAlt className="text-lg" />}
      </span>
    </button>
  );
}
