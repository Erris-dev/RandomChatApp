import Select from "../molecule/Select";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../store/useAuthStore";
import QueueModal from "../organism/queueModal";
import { useState, useEffect } from "react";

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

const QueueList = () => {
  const { authUser, socket, getMe } = useAuthStore();
  const navigate = useNavigate();

  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [profession, setProfession] = useState("");
  const [queueing, setQueueing] = useState(false);

  const [profile, setProfile] = useState(null);
  const userId = authUser?._id;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getMe();
      if (res?.data) setProfile(res.data);
    };
    fetchUser();
  }, [getMe]);

  const handleConnect = () => {
    if (!socket || !socket.connected)
      return console.warn("Socket not connected");
    if (!authUser?._id) return console.warn("Missing user ID");

    if (!gender || !country || !profession) {
      return alert("Please select all filters before connecting.");
    }

    console.log("Emitting with useriD: ", authUser._id);
    socket.emit("joinQueue", {
      userId: authUser._id,
      gender,
      location: country,
      profession,
    });

    setQueueing(true);
  };

  const handleCancel = () => {
    socket.emit("cancelQueue", userId);
    setQueueing(false);
  };

  useEffect(() => {
    if (!socket) return;

    const onUserPaired = (chatId) => {
      setQueueing(false);
      navigate(`/chat?room=${chatId}`);
    };

    socket.on("user-paired", onUserPaired);

    return () => {
      socket.off("user-paired", onUserPaired);
    };
  }, [socket, navigate]);

  return (
    <div className="bg-[#3B3B48] h-screen flex flex-col border-r-5 border-[#D3D3D3]">
      <div className="p-2 border-b-2 text-xl w-full cursor-pointer text-white font-semibold text-center border-[#2f2f3d]">
        <h1 onClick={() => navigate("/home")}>Random Chat App</h1>
      </div>

      <p className="text-white text-center text-[15px] mt-5">
        Choose who you want to talk to!
      </p>

      <div className="mt-10 px-7 flex flex-col gap-1">
        <Select
          label={"Gender"}
          name={"gender"}
          options={[
            { label: "Select Gender", value: "" },
            { label: "Male", value: "Male" },
            { label: "Female", value: "Female" },
          ]}
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />

        <Select
          label={"Location"}
          name={"location"}
          options={[
            { label: "Select Country", value: "" },
            ...europeanCountries,
          ]}
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />

        <Select
          label={"Profession"}
          name={"profession"}
          options={[
            { label: "Select Profession", value: "" },
            ...techProfessions,
          ]}
          value={profession}
          onChange={(e) => setProfession(e.target.value)}
        />
      </div>

      <div className="flex justify-center py-2 px-7 border-[#2f2f3d] border-b-2">
        {queueing ? (
          <button
            className="bg-red-500 text-white font-semibold rounded-[5px] p-1 w-full"
            onClick={handleCancel}
          >
            Cancel
          </button>
        ) : (
          <button
            className="bg-[#4D77AD] text-white font-semibold rounded-[5px] p-1 w-full"
            onClick={handleConnect}
          >
            Connect!
          </button>
        )}
      </div>

      <div className="bg-[#2f2f3d] text-gray-300 p-4 rounded-md w-[90%] ml-3 mt-5">
        <h3 className="text-white font-semibold mb-2">Rules:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Be Respectful</li>
          <li>Don't Share Personal Info</li>
          <li>No Inappropriate Content</li>
          <li>No Spamming or Advertising</li>
        </ul>
      </div>

      {/* Optional queue modal */}
      {queueing && <QueueModal />}
    </div>
  );
};

export default QueueList;
