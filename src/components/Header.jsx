import icon from "../assets/images/Logo.svg"

const Header = () => {
  return (
    <div className="flex justify-center items-center h-12 bg-white">
      <img src={icon} alt="" />
    </div>
  );
};

export default Header;