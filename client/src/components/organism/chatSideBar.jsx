import defaultAvatar from "../../assets/default.png";

const ChatSidebar = ({partner}) => {
    return (
        <div className="w-64 bg-gray-100 border-l-2 border-[#D3D3D3] p-4 flex flex-col">
        <div className="flex flex-col items-center">
          <img src={partner?.avatar || defaultAvatar} className="w-20 h-20 rounded-full mb-2"/>
          <h4 className="font-semibold">{partner.username}</h4>
          <p className="text-gray-500 text-sm">{partner.profession || "Not set"}</p>
        </div>

        <div className="mt-6 space-y-2 text-sm text-gray-600">
          <div>
            <p className="font-medium text-black">Email</p>
            <p className="text-blue-500 cursor-pointer">{partner.email}</p>
          </div>
          <div>
            <p className="font-medium text-black">Location</p>
            <p>{partner.location || "Not Set"}</p>
          </div>
          <div>
            <p className="font-medium text-black">Gender</p>
            <p>{partner.gender|| "Not Set"}</p>
          </div>
        </div>

        <div className="mt-6">
          <p className="font-medium mb-2">Saved</p>
          <div className="grid grid-cols-2 gap-2">
            <div className="w-full h-16 bg-gray-300"></div>
            <div className="w-full h-16 bg-gray-300"></div>
            <div className="w-full h-16 bg-gray-300"></div>
            <div className="w-full h-16 bg-gray-300"></div>
          </div>
        </div>
      </div>
    );
}

export default ChatSidebar