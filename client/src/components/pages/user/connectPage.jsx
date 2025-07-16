import QueueModal from "../../organism/queueModal";
import HeroImage from "../../../assets/hero-image.jpg";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../../store/useAuthStore";

const ConnectPage = () => {
  const [queueing, setQueueing] = useState(false);
  const navigate = useNavigate();
  const { authUser, socket, getMe } = useAuthStore();

  const userId = authUser?._id;

  useEffect(() => {
    getMe();
  }, [getMe]);

  const handleConnect = () => {
    if (!socket || !socket.connected)
      return console.warn("Socket not connected");
    if (!authUser?._id) return console.warn("Missing user or profile data");

    console.log("Emtting with userId: ", authUser._id);
    socket.emit("joinQueue", {
      userId: authUser._id,
      gender: "",
      location: "",
      profession: "",
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
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="rounded-2xl h-70 w-120 overflow-hidden">
        <img
          src={HeroImage}
          alt="Hero Image"
          className="w-full h-full object-cover"
        />
      </div>
      <h1 className="text-3xl font-bold mt-2">
        {" "}
        Strangers Today. Friends Tomorrow
      </h1>
      <p className="text-2xl font-medium">
        Start chatting with people worldwide — your next friend is one message
        away.
      </p>
      <button
        onClick={handleConnect}
        className="bg-[#4D77AD] cursor-pointer text-white font-semibold mt-5 rounded-[5px] p-1 w-35 transition duration-200 transform hover:scale-105"
      >
        Connect!
      </button>

      <QueueModal open={queueing} onCancel={handleCancel} />
    </div>
  );
};

export default ConnectPage;
