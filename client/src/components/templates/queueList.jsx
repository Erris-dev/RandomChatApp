import Select from "../molecule/Select";

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

    return (
        <div className="bg-[#3B3B48] h-screen flex  flex-col border-r-5 border-[#D3D3D3]">

            <div className="p-2 border-b-2 text-xl w-full text-white font-semibold text-center border-[#2f2f3d]">
                <h1>Random Chat App</h1>
            </div>

            <p className="text-white text-center text-[15px] mt-5">Choose who you want to talk to!</p>

            <div className="mt-10 px-7 flex flex-col gap-1">
                <Select label={"Gender"} name={"gender"}
                options={[
                    { label: "Male", value: "male" },
                    { label: "Female", value: "female" },
                    { label: "Other", value: "other" },
                    ]}
                />
                <Select
                    label={"Country"}
                    name={"country"}
                    options={europeanCountries}
                />
                <Select
                    label={"Profession"}
                    name={"profession"}
                    options={techProfessions}
                />
            </div>
            
            <div className="flex justify-center py-2 px-7 border-[#2f2f3d] border-b-2">
                <button className="bg-[#4D77AD] text-white font-semibold rounded-[5px] p-1 w-full">Connect!</button>
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
            
        </div>
    );
}

export default QueueList;