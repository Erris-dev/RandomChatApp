import { useState, useEffect } from "react";
import { FaSearch, FaUserPlus } from "react-icons/fa";
import FriendRequestsModal from "../organism/FriendRequestModal";
import { useFriendsStore } from "../../store/useFriendsStore";
import { useAuthStore } from "../../store/useAuthStore";
import { useChatStore } from "../../store/useMessageStore";
import { useNavigate } from "react-router-dom";
import defaultAvatar from "../../assets/default.png";

const FriendList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { friends, isLoading, getFriends } = useFriendsStore();
  const { openChatSessionWithFriend } = useChatStore();
  const { socket } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    getFriends();
  }, [getFriends]);

  const handleOpenChat = async (friendId) => {
    console.log(friendId);
    const session = await openChatSessionWithFriend(friendId);
    if (session) {
      socket.emit("joinRoom", session._id);
      navigate(`/chat?room=${session._id}`);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="bg-[#3B3B48] h-screen flex flex-col border-r-5 border-[#D3D3D3]">
      {/* Search Bar */}
      <div className="p-2 border-b-2 border-[#2f2f3d]">
        <div className="flex items-center bg-[#2f2f3d] px-3 py-2 rounded-full w-full">
          <input
            type="text"
            placeholder="Search friends..."
            className="bg-transparent outline-none text-white placeholder-gray-400 flex-grow"
          />
          <FaSearch className="text-gray-400 cursor-pointer hover:text-white transition" />
        </div>
      </div>

      {/* Friends List */}
      <div className="mt-4 px-3 flex flex-col gap-2 overflow-auto">
        {isLoading ? (
          <p className="text-gray-400 text-sm">Loading friends...</p>
        ) : friends.length === 0 ? (
          <p className="text-gray-400 text-sm">No friends yet.</p>
        ) : (
          friends.map((friend) => (
            <div
              key={friend._id}
              onClick={() => handleOpenChat(friend._id)}
              className="flex items-center bg-[#2f2f3d] px-2 py-2 rounded-md cursor-pointer hover:bg-[#3b3b4d] transition"
            >
              <div className="relative w-10 h-10">
                <img
                  src={friend.avatar || defaultAvatar}
                  alt={friend.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#2f2f3d] rounded-full"></span>
              </div>
              <div className="ml-3">
                <h4 className="text-white font-semibold text-[17px]">
                  {friend.username}
                </h4>
                <p className="text-gray-400 text-[12px] truncate">
                  {friend.email}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Friend Requests Button */}
      <div className="mt-auto p-4">
        <div
          onClick={openModal}
          className="flex items-center gap-2 bg-[#2f2f3d] py-2 px-7 rounded-xl text-white cursor-pointer hover:bg-[#3b3b4d] transition"
        >
          <FaUserPlus className="text-2xl" />
          <p className="text-[18px] font-semibold">Friend Requests</p>
        </div>
      </div>

      {/* Friend Requests Modal */}
      <FriendRequestsModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default FriendList;
