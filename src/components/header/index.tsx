import Ad from "./Ad";
import Main from "./Main";
import Top from "./Top";
import { countryData } from "../../app/page"; // Adjust path as needed

type HeaderProps = {
  country: countryData;
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
