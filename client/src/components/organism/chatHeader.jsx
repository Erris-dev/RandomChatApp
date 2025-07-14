import { FaUserPlus } from "react-icons/fa";
import defaultAvatar from "../../assets/default.png";
import { useState } from "react";
import { useFriendsStore } from "../../store/useFriendsStore";

const ChatHeader = ({ partner }) => {
    const [requestSent, setRequestSent] = useState(false);
    const { sendFriendRequest } = useFriendsStore();

    const handleSendFriendRequest = async () => {
        if (!partner?._id) return;

        sendFriendRequest(partner?._id);
    }

    return (
        <div className="flex items-center justify-between px-4 py-3 bg-[#F9F9F9] border-b-2 border-[#D3D3D3]">
            <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="relative">
                    <img
                        src={partner?.avatar || defaultAvatar}
                        alt="Avatar"
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    {/* Online status dot */}
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                </div>

                {/* Username and status */}
                <div>
                    <h4 className="font-semibold">{partner?.username || "Unknown User"}</h4>
                    <p className="text-green-500 text-sm">Online</p>
                </div>
            </div>

            {/* Send Friend Request Icon */}
            <button
                onClick={handleSendFriendRequest}
                disabled={requestSent}
                className="text-2xl text-[#D3D3D3] hover:text-[#3B3B48] transition"
                title="Send Friend Request"
            >
                <FaUserPlus />
            </button>
        </div>
    );
};

export default ChatHeader;
