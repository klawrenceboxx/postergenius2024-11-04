// components/footer/index.tsx
import Links from "./Links";
import Socials from "./Socials";
import Newsletter from "./NewsLetter";
import Payment from "./Payment";
import { CountryData } from "@/types/CountryData";

type FooterProps = {
  country: CountryData;
};

const Footer: React.FC<FooterProps> = ({ country }) => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto flex flex-col items-center">
        {/* Footer Links */}
        <Links />
        <Socials />
        <Newsletter />
        <Payment />

        {/* Footer Text */}
        <p className="text-center mt-4 text-sm">
          © {new Date().getFullYear()} PosterGenius. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
