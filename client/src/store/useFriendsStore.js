import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useFriendsStore = create((set) => ({
    friends: [],
    requests: [],
    isLoadingFriends: false,
    isLoadingRequests: false,

    getFriends: async () => {
        set({ isLoadingFriends: true });
        try {
            const res = await axiosInstance.get("/friends/all");
            set({ friends: res.data });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch friends");
        } finally {
            set({ isLoadingFriends: false });
        }
    },

    getFriendRequests: async () => {
        set({ isLoadingRequests: true });
        try {
            const res = await axiosInstance.get("/friends/pending");
            set({ requests: res.data });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch requests");
        } finally {
            set({ isLoadingRequests: false });
        }
    },

    sendFriendRequest: async (recipientId) => {
        try {
            const res = await axiosInstance.post("/friends/send", recipientId );
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send request");
        }
    },

    acceptRequest: async (requestId) => {
        try {
            const res = await axiosInstance.post("/friends/accept",  requestId );
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to accept");
        }
    },

    declineRequest: async (requestId) => {
        try {
            const res = await axiosInstance.post("/friends/decline", requestId );
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to decline");
        }
    },

    blockRequest: async (requestId) => {
        try {
            const res = await axiosInstance.post("/friends/block",  requestId );
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to block");
        }
    },

    cancelRequest: async (requestId) => {
        try {
            const res = await axiosInstance.post("/friends/cancel", requestId );
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to cancel");
        }
    }
}));
