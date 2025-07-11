import Link from "next/link";

const Links: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 text-sm">
      {/* Section: SHOPPAY */}
      <div>
        <h3 className="font-bold text-white">SHOPPAY</h3>
        <ul className="mt-4 space-y-3">
          <li>
            <Link href="/about-us" className="hover:underline text-gray-400">
              About us
            </Link>
          </li>
          <li>
            <Link href="/contact-us" className="hover:underline text-gray-400">
              Contact us
            </Link>
          </li>
          <li>
            <Link
              href="/social-responsibility"
              className="hover:underline text-gray-400"
            >
              Social Responsibility
            </Link>
          </li>
        </ul>
      </div>

      {/* Section: HELP & SUPPORT */}
      <div>
        <h3 className="font-bold text-white">HELP & SUPPORT</h3>
        <ul className="mt-4 space-y-3">
          <li>
            <Link
              href="/shipping-info"
              className="hover:underline text-gray-400"
            >
              Shipping Info
            </Link>
          </li>
          <li>
            <Link href="/returns" className="hover:underline text-gray-400">
              Returns
            </Link>
          </li>
          <li>
            <Link
              href="/how-to-order"
              className="hover:underline text-gray-400"
            >
              How To Order
            </Link>
          </li>
          <li>
            <Link
              href="/how-to-track"
              className="hover:underline text-gray-400"
            >
              How To Track
            </Link>
          </li>
          <li>
            <Link href="/size-guide" className="hover:underline text-gray-400">
              Size Guide
            </Link>
          </li>
        </ul>
      </div>

      {/* Section: Customer Service */}
      <div>
        <h3 className="font-bold text-white">Customer Service</h3>
        <ul className="mt-4 space-y-3">
          <li>
            <Link
              href="/customer-service"
              className="hover:underline text-gray-400"
            >
              Customer Service
            </Link>
          </li>
          <li>
            <Link
              href="/terms-and-conditions"
              className="hover:underline text-gray-400"
            >
              Terms and Conditions
            </Link>
          </li>
          <li>
            <Link
              href="/consumers-transactions"
              className="hover:underline text-gray-400"
            >
              Consumers (Transactions)
            </Link>
          </li>
          <li>
            <Link
              href="/feedback-survey"
              className="hover:underline text-gray-400"
            >
              Take our feedback survey
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Links;
