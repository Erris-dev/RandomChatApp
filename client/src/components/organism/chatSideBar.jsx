import defaultAvatar from "../../assets/default.png";

const ChatSidebar = ({ partner, isFriend, onUnfriend, saved= {} }) => {
 const savedObj = Array.isArray(saved) ? saved[0] || {} : saved;
  const images = Array.isArray(savedObj.images) ? savedObj.images : [];
  return (
    <div className="w-64 bg-gray-100 border-l-2 border-[#D3D3D3] p-4 flex flex-col">
      <div className="flex flex-col items-center">
        <img
          src={partner?.avatar || defaultAvatar}
          className="w-20 h-20 rounded-full mb-2"
        />
        <h4 className="font-semibold">{partner.username}</h4>
        <p className="text-gray-500 text-sm">
          {partner.profession || "Not set"}
        </p>

        {isFriend && (
          <button
            onClick={onUnfriend}
            className="mt-3 text-sm bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
          >
            Unfriend
          </button>
        )}
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
          <p>{partner.gender || "Not Set"}</p>
        </div>
      </div>

      <div className="mt-6">
        <p className="font-medium mb-2">Saved Images</p>
        {images.length === 0 ? (
          <p className="text-gray-400 text-sm">No saved images available.</p>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {images.map((imgUrl, idx) => (
              <img
                key={idx}
                src={imgUrl}
                alt={`Saved image ${idx + 1}`}
                className="w-full h-16 object-cover rounded-md cursor-pointer hover:opacity-80 transition"
                onClick={() => window.open(imgUrl, "_blank")}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;
