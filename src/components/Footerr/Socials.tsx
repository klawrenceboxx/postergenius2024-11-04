import Link from "next/link";
import { FaFacebookF, FaTiktok } from "react-icons/fa";
import {
  BsInstagram,
  BsTwitter,
  BsYoutube,
  BsPinterest,
  BsSnapchat,
} from "react-icons/bs";

export default function Socials() {
  return (
    <div className="footer__socials">
      <section>
        <h3 className="text-lg font-semibold mt-4">STAY CONNECTED</h3>
        <ul className=" flex space-x-3 mt-4">
          <li>
            <Link
              href="https://facebook.com"
              target="_blank"
              aria-label="Facebook"
            >
              <FaFacebookF size={20} className="hover:text-blue-600" />
            </Link>
          </li>
          <li>
            <Link
              href="https://instagram.com"
              target="_blank"
              aria-label="Instagram"
            >
              <BsInstagram size={20} className="hover:text-pink-600" />
            </Link>
          </li>
          <li>
            <Link
              href="https://twitter.com"
              target="_blank"
              aria-label="Twitter"
            >
              <BsTwitter size={20} className="hover:text-blue-400" />
            </Link>
          </li>
          <li>
            <Link
              href="https://youtube.com"
              target="_blank"
              aria-label="YouTube"
            >
              <BsYoutube size={20} className="hover:text-red-600" />
            </Link>
          </li>
          <li>
            <Link
              href="https://pinterest.com"
              target="_blank"
              aria-label="Pinterest"
            >
              <BsPinterest size={20} className="hover:text-red-500" />
            </Link>
          </li>
          <li>
            <Link
              href="https://snapchat.com"
              target="_blank"
              aria-label="Snapchat"
            >
              <BsSnapchat size={20} className="hover:text-yellow-500" />
            </Link>
          </li>
          <li>
            <Link href="https://tiktok.com" target="_blank" aria-label="TikTok">
              <FaTiktok size={20} className="hover:text-black" />
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
