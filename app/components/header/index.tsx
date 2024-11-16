import Ad from "./Ad";
import Main from "./Main";
import Top from "./Top";

const Header: React.FC = () => {
  return (
    <header>
      <div>
        {/* Header Links */}
        <Ad />
        <Top />
        <Main />
      </div>
    </header>
  );
};

export default Header;
