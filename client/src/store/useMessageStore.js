import { axiosInstance } from "../lib/axios";
import { create } from "zustand";
import toast from "react-hot-toast";

export const useChatStore = create((set,get) => ({
    pairedInfo: null,
    messages: [],
    friends: [],
    isGettingInfo: false,
    isLoadingFriends: false,
    isLoadingMessages: false,
    isOpeningChat: false,

    setMessages: (msg) => set((state) => ({ messages: [...state.messages, msg] })),

    getPartnerInfo: async(chatId) => {
        set({isGettingInfo: true});
        try {
            const res = await axiosInstance.get(`/messages/getPartnerInfo/${chatId}`);
            set({pairedInfo: res.data});
        } catch (error){
            console.log("Failed to fetch partner info:",error.response.data.message);
        } finally {
            set({isGettingInfo: false});
        } 
    },


    openChatSessionWithFriend: async (friendId) => {
        set({ isOpeningChat: true });
        try {
            console.log(friendId);
            const res = await axiosInstance.post("/messages/openChat", { friendId });

            const { session, messages } = res.data;

            const getPartnerInfo = get().getPartnerInfo;
            if (getPartnerInfo) {
                await getPartnerInfo(session._id);
            }

            return session; // Optional: in case the UI needs session._id for socket.join(roomId)
        } catch (error) {
            console.error("Failed to open chat:", error);
            toast.error(error.response?.data?.message || "Could not open chat");
        } finally {
            set({ isOpeningChat: false });
        }
    },

    getMessages: async(roomId) => {
        set({isLoadingMessages: true});
        try {
            const res = await axiosInstance.get(`/messages/loadMessages/${roomId}`);
            set({messages: res.data});
            toast.success('Messages fetched successfully');
        } catch (error) {
            toast.error(error.response?.data?.message);
        } finally {
            set({isLoadingMessages: false});
        }
    }

}));
