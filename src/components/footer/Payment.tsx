import Image from "next/image";

export default function Payment() {
  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-4">WE ACCEPT</h3>
      <div className="flex gap-4 justify-start">
        {/* Image Container */}
        <div className="w-28">
          {" "}
          {/* Set container width */}
          <Image
            src="/payments/visa.jpeg"
            alt="Visa"
            width={100}
            height={0}
            className="rounded-md"
          />
        </div>
        <div className="w-28">
          {" "}
          {/* Set container width */}
          <Image
            src="/payments/mastercard.webp"
            alt="MasterCard"
            width={100}
            height={0} // Aspect ratio maintained
            className="rounded-md"
          />
        </div>
        <div className="w-28">
          {" "}
          {/* Set container width */}
          <Image
            src="/payments/paypal.png"
            alt="Paypal"
            width={100}
            height={60} // Aspect ratio maintained
            className="rounded-md"
          />
        </div>
      </div>
    </div>
  );
}
