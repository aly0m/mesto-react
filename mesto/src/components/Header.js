import logo from '../images/logo.svg';

const Header = () => {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt={"Mesto"}/>
    </header>
  );
};

export default Header;