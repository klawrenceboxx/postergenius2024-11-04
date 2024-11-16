import Image from "next/image";

export default function Payment() {
  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-4">WE ACCEPT</h3>
      <div className="flex gap-4 justify-start">
        <Image
          src="/payments/visa.jpeg"
          alt="Visa"
          width={100}
          height={30}
          className="rounded-md"
        />
        <Image
          src="/payments/mastercard.webp"
          alt="MasterCard"
          width={90}
          height={30}
          className="rounded-md"
        />
        <Image
          src="/payments/paypal.png"
          alt="Paypal"
          width={150}
          height={30}
          className="rounded-md"
        />
      </div>
    </div>
  );
}
