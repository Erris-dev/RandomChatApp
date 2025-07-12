import { axiosInstance } from "../lib/axios";
import { create } from "zustand";
import toast from "react-hot-toast";

export const useChatStore = create((set) => ({
    pairedInfo: null,
    isGettingInfo: false,
    messages: [],


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

}));
