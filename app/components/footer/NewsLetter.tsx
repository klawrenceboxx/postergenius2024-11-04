import Link from "next/link";

export default function NewsLetter() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto my-8">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        SIGN UP FOR OUR NEWSLETTER
      </h3>
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Your Email Address"
          className="flex-grow px-4 py-3 rounded-md border border-gray-300 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
        />
        <button className="bg-blue-600 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 transition duration-200 shadow-md">
          SUBSCRIBE
        </button>
      </div>
      <p className="text-sm text-gray-600 text-center">
        By clicking the SUBSCRIBE button, you are agreeing to our{" "}
        <Link
          href="/privacy-policy"
          className="text-blue-600 underline hover:text-blue-700"
        >
          Privacy & Cookie Policy
        </Link>
      </p>
    </div>
  );
}
