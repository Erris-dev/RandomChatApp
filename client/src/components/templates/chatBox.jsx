import { useState, useEffect, useRef } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useChatStore } from "../../store/useMessageStore";
import { useSearchParams } from "react-router";
import ChatHeader from "../organism/chatHeader";
import MessageInput from "../organism/MessageInput";
import ChatSidebar from "../organism/chatSideBar";

const ChatBox = () => {
  const { socket, authUser } = useAuthStore();
  const { pairedInfo, getPartnerInfo, isGettingInfo, getMessages, messages, setMessages } = useChatStore();
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("room");

  const [message, setMessage] = useState("");
  const [images, setImages] = useState([]); // store selected images as base64 strings
  const messagesEndRef = useRef(null);

  // Scroll to latest message
  console.log(roomId)
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Socket: Join room & listen for messages
  useEffect(() => {
    if (!socket || !roomId) return;

    socket.emit("joinRoom", roomId);

    const handleReceiveMessage = (newMessage) => {
        setMessages(newMessage)
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
    }
  }, [roomId, authUser]);

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
                  <img
                    key={i}
                    src={img}
                    alt={`attachment-${i}`}
                    className="mt-2 max-w-full rounded-lg"
                  />
                ))}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

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
      <ChatSidebar partner={pairedInfo} />
    </div>
  );
};

export default ChatBox;
