import { useState } from "react";
import { FaPaperPlane, FaUserPlus, FaPaperclip } from "react-icons/fa";

const ChatBox = () => {
    const [message, setMessage] = useState("");

    const messages = [
        { text: "Hey how are you?", from: "other" },
        { text: "I'm good, you?", from: "other" },
        { text: "All fine, working on a project.", from: "me" },
        { text: "What project?", from: "me" },
    ];

    return (
        <div className="h-screen w-full flex">

            {/* Left Chat Area */}
            <div className="flex flex-col flex-grow relative">
                
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-[#F9F9F9] border-b-2 border-[#D3D3D3]">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-300 relative">
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                        </div>
                        <div>
                            <h4 className="font-semibold">Erris Binxhija</h4>
                            <p className="text-green-500 text-sm">Online</p>
                        </div>
                    </div>
                    <FaUserPlus className="text-2xl text-[#D3D3D3] cursor-pointer" />
                </div>

                {/* Chat Messages */}
                <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-xs px-4 py-2 rounded-lg ${msg.from === "me" ? "bg-[#3B3B48] text-white" : "bg-gray-300 text-black"}`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Message Input */}
                <div className="flex items-center p-3  bg-white">
                    <FaPaperclip className="text-gray-500 text-xl mr-3 cursor-pointer" />
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Say something..."
                        className="flex-grow bg-gray-100 rounded-full px-4 py-2 outline-none"
                    />
                    <button className="ml-3 bg-purple-500 text-white p-2 rounded-full hover:bg-purple-600">
                        <FaPaperPlane />
                    </button>
                </div>
            </div>

            {/* Right Sidebar */}
            <div className="w-64 bg-gray-100 border-l-2 border-[#D3D3D3] p-4 flex flex-col">
                <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-gray-300 mb-2"></div>
                    <h4 className="font-semibold">Erris Binxhija</h4>
                    <p className="text-gray-500 text-sm">software engineer</p>
                </div>

                <div className="mt-6 space-y-2 text-sm text-gray-600">
                    <div>
                        <p className="font-medium text-black">Email</p>
                        <p className="text-blue-500 cursor-pointer">errisbossi@gmail.com</p>
                    </div>
                    <div>
                        <p className="font-medium text-black">Date of birth</p>
                        <p>13/05/2005</p>
                    </div>
                    <div>
                        <p className="font-medium text-black">Gender</p>
                        <p>Male</p>
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

        </div>
    );
};

export default ChatBox;
