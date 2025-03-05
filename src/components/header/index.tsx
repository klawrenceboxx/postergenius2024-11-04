import Ad from "./Ad";
import Main from "./Main";
import Top from "./Top";
import { CountryData } from "@/types/CountryData";

type HeaderProps = {
  country: CountryData;
};

const Header: React.FC<HeaderProps> = ({ country }) => {
  return (
    <header>
      <div>
        {/* Header Links */}
        <Ad />
        <Top country={country} />
        <Main />
      </div>
    </header>
  );
};

export default Header;
