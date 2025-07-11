import Input from "../../atoms/Input";
import Radio from "../../molecule/Radio";
import Select2 from "../../molecule/Select2";
import { FaUser, FaPlus } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../../../store/useAuthStore";
import defaultAvatar from "../../../assets/default.png";

// Country & Profession Data
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
  const fileInputRef = useRef(null);
  const { authUser, updateProfile, getMe } = useAuthStore();

  const [formData, setFormData] = useState({
  username: "",
  email: "",
  gender: "",
  location: "",
  profession: "",
  avatar: defaultAvatar,
});

useEffect(() => {
    getMe();
  }, []);

useEffect(() => {
  if (authUser) {
    const { username, email, gender, location, profession, avatar } = authUser;
    setFormData({
      username: username || "",
      email: email || "",
      gender: gender || "",
      location: location || "",
      profession: profession || "",
      avatar: avatar || defaultAvatar,
    });
  }
}, [authUser]);

  // Input handler
  const handleInputChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handlePlusClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const base64Img = reader.result;
      setFormData({ ...formData, avatar: base64Img });
    };
  };

  const handleSave = () => {
    updateProfile(formData);
  };

  return (
    <div className="w-full h-screen flex-col p-5">
      {/* Avatar */}
      <div className="bg-[#F1F1F1] h-30 flex gap-10 rounded-2xl items-center px-8 py-4">
        <div className="relative size-24 rounded-full overflow-hidden bg-gray-300">
          <img
            src={formData.avatar}
            alt="avatar"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute bottom-0 right-0 bg-[#8A88BF] p-1.5 rounded-full text-white cursor-pointer hover:bg-[#6f6ca3] transition"
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
            Hello, <span className="text-[#8A88BF]">{formData.username}</span>
          </h1>
        </div>
      </div>

      {/* Form Fields */}
      <div className="flex flex-wrap gap-4 mt-4 mb-4">
        <div className="w-[35%]">
          <Input
            label="Username"
            icon={<FaUser />}
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleInputChange("username")}
          />
        </div>
        <div className="w-[35%]">
          <Input
            label="Email"
            icon={<MdEmail />}
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange("email")}
          />
        </div>
        <div className="w-[35%]">
          <Radio
            value={formData.gender}
            onChange={(val) => setFormData({ ...formData, gender: val })}
          />
        </div>
        <div className="w-[35%]">
          <Select2
            label="Location"
            options={europeanCountries}
            value={formData.location}
            onChange={(val) => setFormData({ ...formData, location: val })}
          />
        </div>
        <div className="w-[35%]">
          <Select2
            label="Profession"
            options={techProfessions}
            value={formData.profession}
            onChange={(val) => setFormData({ ...formData, profession: val })}
          />
        </div>
      </div>

      {/* Save */}
      <p className="mb-2">After finishing please click save to save your changes</p>

      <button
        onClick={handleSave}
        className="bg-[#8A88BF] hover:bg-[#6f6ca3] p-2 w-33 rounded-[7px] mt-2 text-white font-semibold transition duration-200 transform hover:scale-105"
      >
        Save
      </button>
    </div>
  );
};

export default EditProfile;
