import { BsPlus, BsGearFill } from "react-icons/bs";
import { FaGift, FaGifts, FaGithub, FaHome, FaMoon, FaSurprise } from "react-icons/fa";
import { redirect } from "react-router-dom";

const SideBar = ({ toggleDark }: any) => {
  return (
    <div
      className="container h-screen w-16 flex flex-col justify-between
                  bg-white dark:bg-gray-900 shadow-lg"
    >
      <button title="Home" onClick={() => window.location.reload()}>
        <SideBarIcon icon={<FaHome size="28" />} />
      </button>
      <SideBarIcon icon={<FaGift size="32" />} />

      <div className="flex flex-col gap-2 justify-center">
        <Divider />
        <a title="GitHub" href="https://github.com/kira1433">
          <SideBarIcon icon={<FaGithub size="28" />} />
        </a>
        <button title="Dark mode" onClick={toggleDark}>
          <SideBarIcon icon={<FaMoon size="20" />} />
        </button>
        <SideBarIcon icon={<BsGearFill size="22" />} />
      </div>
    </div>
  );
};

const SideBarIcon = ({ icon }: any) => (
  <div className="flex items-center justify-center h-12 w-12 my-2 mx-auto shadow-lg bg-gray-200 dark:bg-gray-800 text-green-500 hover:bg-green-600 hover:text-white rounded-3xl hover:rounded-xl transition-all duration-300 ease-linear cursor-pointer">
    {icon}
  </div>
);

const Divider = () => <hr />;

export default SideBar;
