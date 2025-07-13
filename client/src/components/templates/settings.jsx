import { useLocation, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { TbLockPassword } from "react-icons/tb";
import { RiVerifiedBadgeLine } from "react-icons/ri";

const navItems = [
  { key: "profile", label: "Profile Settings", icon: <CgProfile className="size-6" />, path: "/settings/edit-profile" },
  { key: "password", label: "Password", icon: <TbLockPassword className="size-6" />, path: "/settings/password" },
  { key: "verification", label: "Verification", icon: <RiVerifiedBadgeLine className="size-6" />, path: "/settings/verification" },
];

const Settings = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="bg-[#3B3B48] h-screen flex flex-col border-r border-[#D3D3D3]">
      <header className="p-4  border-b-2 border-[#2f2f3d] text-white text-center font-bold text-xl">
        Settings Page
      </header>

      <section className=" py-4">
        <h2 className="text-[#D9D9D9] font-semibold px-3 text-lg mb-2">Account Settings</h2>
        <nav>
          <ul className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li
                  key={item.key}
                  onClick={() => navigate(item.path)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && navigate(item.path)}
                  className={`
                    flex items-center gap-3 px-6 py-3 text-[17px] font-semibold cursor-pointer
                    transition-all duration-200 text-white
                    ${isActive ? "bg-[#2F2F3D] border-l-4 border-[#00FF9D]" : "border-l-4 border-transparent"}
                  `}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </li>
              );
            })}
          </ul>
        </nav>
      </section>
    </div>
  );
};

export default Settings;
