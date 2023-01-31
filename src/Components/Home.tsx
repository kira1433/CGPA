import Calc from "./Calc";
import SideBar from "./Sidebar";
import { useEffect, useState } from "react";

function Home() {
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode") || "false")
  );
  const toggleDark = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", JSON.stringify(!darkMode));
  };
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);
  return (
    <div className="justify-end  flex flex-row h-screen w-screen overflow-auto">
      <SideBar toggleDark={toggleDark} />
      <Calc />
    </div>
  );
}

export default Home;
