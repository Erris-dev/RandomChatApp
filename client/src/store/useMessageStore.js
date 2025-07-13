import { axiosInstance } from "../lib/axios";
import { create } from "zustand";
import toast from "react-hot-toast";

export const useChatStore = create((set) => ({
    pairedInfo: null,
    messages: [],
    friends: [],
    isGettingInfo: false,
    isLoadingFriends: false,
    isLoadingMessages: false,

    getPartnerInfo: async(chatId) => {
        set({isGettingInfo: true});
        try {
            const res = await axiosInstance.get(`/messages/getPartnerInfo/${chatId}`);
            set({pairedInfo: res.data});
        } catch (error){
            console.log(error.response.data.message);
        } finally {
            set({isGettingInfo: false});
        } 
    },

    getFriends: async() => {
        set({isLoadingFriends: true});
        try {
            const res = await axiosInstance.get('/messages/getFriends');
            set({friends: res.data});
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({isLoadingFriends: false});
        }
    },

    getMessages: async (userId) => {
        set({isLoadingMessages: true});
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({messages: res.data});
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({isLoadingMessages: false});
        }
    }

}));
