import Input from "../../atoms/Input";
import Radio from "../../molecule/Radio";
import Select2 from "../../molecule/Select2";
import { FaUser, FaPlus} from "react-icons/fa";
import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { useRef } from "react";


const europeanCountries = [
    { label: "Albania", value: "albania" },
    { label: "Austria", value: "austria" },
    { label: "Belgium", value: "belgium" },
    { label: "Bosnia and Herzegovina", value: "bosnia" },
    { label: "Bulgaria", value: "bulgaria" },
    { label: "Croatia", value: "croatia" },
    { label: "Czech Republic", value: "czech" },
    { label: "Denmark", value: "denmark" },
    { label: "Estonia", value: "estonia" },
    { label: "Finland", value: "finland" },
    { label: "France", value: "france" },
    { label: "Germany", value: "germany" },
    { label: "Greece", value: "greece" },
    { label: "Hungary", value: "hungary" },
    { label: "Iceland", value: "iceland" },
    { label: "Ireland", value: "ireland" },
    { label: "Italy", value: "italy" },
    { label: "Kosovo", value: "kosovo" },
    { label: "Latvia", value: "latvia" },
    { label: "Lithuania", value: "lithuania" },
    { label: "Luxembourg", value: "luxembourg" },
    { label: "Malta", value: "malta" },
    { label: "Moldova", value: "moldova" },
    { label: "Montenegro", value: "montenegro" },
    { label: "Netherlands", value: "netherlands" },
    { label: "North Macedonia", value: "north-macedonia" },
    { label: "Norway", value: "norway" },
    { label: "Poland", value: "poland" },
    { label: "Portugal", value: "portugal" },
    { label: "Romania", value: "romania" },
    { label: "Serbia", value: "serbia" },
    { label: "Slovakia", value: "slovakia" },
    { label: "Slovenia", value: "slovenia" },
    { label: "Spain", value: "spain" },
    { label: "Sweden", value: "sweden" },
    { label: "Switzerland", value: "switzerland" },
    { label: "United Kingdom", value: "uk" },
  ];
   const techProfessions = [
    { label: "Software Engineer", value: "software-engineer" },
    { label: "Frontend Developer", value: "frontend-developer" },
    { label: "Backend Developer", value: "backend-developer" },
    { label: "Full Stack Developer", value: "fullstack-developer" },
    { label: "Data Scientist", value: "data-scientist" },
    { label: "DevOps Engineer", value: "devops-engineer" },
    { label: "UI/UX Designer", value: "ui-ux-designer" },
    { label: "Mobile App Developer", value: "mobile-developer" },
    { label: "Cybersecurity Specialist", value: "cybersecurity-specialist" },
    { label: "AI/ML Engineer", value: "ai-ml-engineer" },
  ];


const EditProfile = () => {
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [profession, setProfession] = useState("");
  const fileInputRef = useRef(null);

  const handlePlusClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file);
    }
  };

  return (
    <div className="w-full h-screen flex-col p-5">
      {/* Avatar and actions */}
      <div className="bg-[#F1F1F1] h-30 flex gap-10 rounded-2xl items-center px-8">
        <div className="bg-gray-500 size-22 rounded-full relative">
          <div
            className="bg-[#8A88BF] flex items-center justify-center size-7 text-white rounded-3xl absolute right-0 bottom-0 cursor-pointer hover:bg-[#6f6ca3] transition"
            onClick={handlePlusClick}
          >
            <FaPlus />
          </div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">
            Hello, <span className="text-[#8A88BF]">Erris Binxhija</span>
          </h1>
          <div className="flex gap-2">
            <button className="bg-[#8A88BF] hover:bg-[#6f6ca3] p-1 w-33 rounded-[7px] text-white font-semibold transition duration-200 transform hover:scale-105">
              Upload New
            </button>
            <button className="p-1 w-33 rounded-[7px] text-[#8A88BF] border-2 font-semibold border-[#8A88BF] transition duration-200 transform hover:scale-105">
              Delete Avatar
            </button>
          </div>
        </div>
      </div>

      {/* Inputs */}
      <div className="flex flex-wrap gap-4 mt-4 mb-4">
        <div className="w-[35%]">
          <Input label="Username" icon={<FaUser />} placeholder="Erris Binxhija" />
        </div>
        <div className="w-[35%]">
          <Input label="Email" icon={<MdEmail />} placeholder="errisbinxhija@gmail.com" />
        </div>
        <div className="w-[35%]">
          <Radio value={gender} onChange={setGender} />
        </div>
        <div className="w-[35%]">
          <Select2
            label="Location"
            value={location}
            onChange={setLocation}
            options={europeanCountries}
          />
        </div>
        <div className="w-[35%]">
          <Select2
            label="Profession"
            value={profession}
            onChange={setProfession}
            options={techProfessions}
          />
        </div>
      </div>

      <p>After finishing please click save to save your changes</p>

      <button className="bg-[#8A88BF] hover:bg-[#6f6ca3] p-2 w-33 rounded-[7px] mt-2 text-white font-semibold transition duration-200 transform hover:scale-105">
        Save
      </button>
    </div>
  );
};

export default EditProfile;