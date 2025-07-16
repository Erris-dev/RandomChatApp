import { useState, useEffect, useRef } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useChatStore } from "../../store/useMessageStore";
import { useFriendsStore } from "../../store/useFriendsStore";
import { useSearchParams } from "react-router";
import ChatHeader from "../organism/chatHeader";
import MessageInput from "../organism/MessageInput";
import ChatSidebar from "../organism/chatSideBar";

const ChatBox = () => {
  const { socket, authUser } = useAuthStore();
  const {
    pairedInfo,
    getPartnerInfo,
    isGettingInfo,
    getMessages,
    messages,
    setMessages,
    savedImages,
    saveImage,
    getSaved
  } = useChatStore();
  const [previewImage, setPreviewImage] = useState(null);
  const { unfriendUser, getFriends } = useFriendsStore();
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("room");

  const [message, setMessage] = useState("");
  const [images, setImages] = useState([]); // store selected images as base64 strings
  const messagesEndRef = useRef(null);


  // Scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Socket: Join room & listen for messages
  useEffect(() => {
    if (!socket || !roomId) return;

    socket.emit("joinRoom", roomId);

    const handleReceiveMessage = (newMessage) => {
      setMessages(newMessage);
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.emit("leaveRoom", roomId);
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [socket, roomId]);

  // Fetch paired user info
  useEffect(() => {
    if (roomId && authUser?._id) {
      getPartnerInfo(roomId);
      getMessages(roomId);
      getFriends();
      console.log('This is the room id', roomId);
      getSaved(roomId)
    }
  }, [roomId, authUser]);

  const checkIfFriends = useFriendsStore((state) => state.checkIfFriends);
  const isFriends = pairedInfo?._id ? checkIfFriends(pairedInfo?._id) : false;

  const removeFriend = async () => {
    await unfriendUser(pairedInfo?._id);
  };

  // Handle sending a message with optional images
  const handleSendMessage = () => {
    if (!message.trim() && images.length === 0) return; // prevent empty sends

    socket.emit("sendMessage", {
      roomId,
      senderId: authUser._id,
      content: message.trim(),
      images, // send base64 images array
    });

    setMessage("");
    setImages([]); // clear images after sending
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSaveImage = async (imgUrl) => {
    if (!imgUrl || !roomId) return;
    await saveImage(roomId, [imgUrl]); 
  }


  // Handle image file selection & convert to base64
  const handleImageChange = (files) => {
    const fileReaders = [];
    const imagePromises = Array.from(files).map(
      (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
          fileReaders.push(reader);
        })
    );

    Promise.all(imagePromises)
      .then((base64Images) => {
        setImages((prev) => [...prev, ...base64Images]);
      })
      .catch((err) => {
        console.error("Error reading images: ", err);
      });
  };

  // Render loading while fetching paired user info
  if (isGettingInfo || !pairedInfo) {
    return (
      <div className="h-screen w-full flex items-center justify-center text-gray-500">
        Fetching chat partner info...
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex">
      {/* Left Chat Area */}
      <div className="flex flex-col flex-grow relative">
        <ChatHeader partner={pairedInfo} />

        {/* Chat Messages */}
        <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((msg) => (
            <div
              key={msg._id || Math.random()}
              className={`flex ${
                msg.senderId === authUser._id ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  msg.senderId === authUser._id
                    ? "bg-[#3B3B48] text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                {/* Text Content */}
                {msg.content}

                {/* Render images */}
                {msg.images?.map((img, i) => (
                  <div key={i} className="relative group inline-block mt-2">
                    <img
                      src={img}
                      alt={`attachment-${i}`}
                      onClick={() => setPreviewImage(img)}
                      className="max-w-[200px] rounded-lg cursor-pointer hover:opacity-80 transition"
                    />
                    <a
                      href={img}
                      download={`chat-image-${i}.jpg`}
                      className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                      onClick={(e) => e.stopPropagation()}
                      title="Download image"
                    >
                      ⬇
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        {previewImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center"
            onClick={() => setPreviewImage(null)}
          >
            <div className="relative max-w-[90vw] max-h-[90vh]">
              <img
                src={previewImage}
                alt="Full View"
                className="rounded-lg max-h-[90vh] max-w-[90vw]"
              />
              <button
              onClick={() => handleSaveImage(previewImage)}
              className="absolute top-4 right-32 cursor-pointer  text-white bg-black bg-opacity-70 p-2 rounded hover:bg-opacity-90">
                Save
                </button>
              <a
                href={previewImage}
                download="chat-image.jpg"
                onClick={(e) => e.stopPropagation()}
                className="absolute top-4 right-4 text-white bg-black bg-opacity-70 p-2 rounded hover:bg-opacity-90"
              >
                Download
              </a>
              <button
                onClick={() => setPreviewImage(null)}
                className="absolute top-4 left-4 text-white bg-black bg-opacity-70 p-2 rounded hover:bg-opacity-90"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Input Field */}
        <MessageInput
          value={message}
          onKeyDown={handleKeyDown}
          onClick={handleSendMessage}
          setMessages={setMessage}
          onImageChange={handleImageChange} // new prop for images
          selectedImages={images} // to preview images in input if needed
          clearImages={() => setImages([])} // optional to clear images
        />
      </div>

      {/* Sidebar */}
      <ChatSidebar
        partner={pairedInfo}
        isFriend={isFriends}
        onUnfriend={removeFriend}
        saved={savedImages[0]}
      />
    </div>
  );
};

export default ChatBox;
