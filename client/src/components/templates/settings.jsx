import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { TbLockPassword } from "react-icons/tb";
import { RiVerifiedBadgeLine } from "react-icons/ri";

const Settings = () => {
  const [activeOption, setActiveOption] = useState("profile");

  const navItems = [
    { key: "profile", label: "Profile Settings", icon: <CgProfile className="size-6" /> },
    { key: "password", label: "Password", icon: <TbLockPassword className="size-6" /> },
    { key: "verification", label: "Verification", icon: <RiVerifiedBadgeLine className="size-6" /> },
  ];

  return (
    <div className="bg-[#3B3B48] h-screen flex flex-col border-r-5 border-[#D3D3D3]">
      <div className="p-2 border-b-2 text-xl w-full text-white font-semibold text-center border-[#2f2f3d]">
        <h1>Settings Page</h1>
      </div>

      <p className="text-[#D9D9D9] font-semibold text-[18px] px-5 py-5">Account Settings</p>

      {navItems.map((item) => (
        <div
          key={item.key}
          onClick={() => setActiveOption(item.key)}
          className={`
            flex items-center gap-2 px-6 py-3 text-[17px] font-semibold cursor-pointer
            transition-all duration-200
            ${activeOption === item.key ? "bg-[#2F2F3D] border-l-4 border-[#00FF9D]" : "border-l-4 border-transparent"}
            text-white
          `}
        >
          {item.icon}
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default Settings;
