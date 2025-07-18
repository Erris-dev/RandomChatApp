import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import { io } from "socket.io-client";

const baseURL = import.meta.env.MODE === "development" ? "http://localhost:5000": '/';

export const useAuthStore = create((set,get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    socket: null,

    checkAuth: async() => {
        try{
            const res = await axiosInstance.get("/auth/check-auth");
            set({authUser: res.data});
            get().connectSocket();

        } catch (error) {
            console.log("Error in checkAuth: ", error);
            set({authUser: null});
        } finally {
            set({isCheckingAuth: false});
        }
    },

    signup: async(data) => {
        set({isSigningUp: true});
        try{
            const res = await axiosInstance.post("/auth/register", data);
            toast.success("Account created succesfully");
            set({authUser: res.data});
            get().connectSocket();

        }catch(error){
            toast.error(error.response.data.message);
        } finally {
            set({isSigningUp: false});
        }
    },

    login: async(data) => {
        set({isLoggingIn: true});
        try {
            const res = await axiosInstance.post("/auth/login", data);
            toast.success("Logged in sucessfully");
            set({authUser: res.data});
            get().connectSocket();
        } catch(error){
            toast.error(error.response.data.message);
        } finally {
            set({isSigningUp: false});
        }
    },

    logout: async() => {
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser: null});
            toast.success("Logged out sucessfully");
            get().disconnectSocket();
        } catch (error){
            toast.error(error.response.data.message);
        }
    },

    getMe: async() => {
        try {
            const res = await axiosInstance.get("/auth/loggedUser");
            set({authUser: res.data});
        } catch (error) {
            console.log("Error in getMe: ", error);
        }
    },

    updateProfile: async(data) => {
        set({isUpdatingProfile: true});
        try {
            const res = await axiosInstance.post('/auth/update-user',data);
            toast.success("User updated successfully!");
            set({authUser: res.data});
        }catch(error){
            toast.error(error.response.data.message);
        }finally{
            set({isUpdatingProfile: false});
        }
    },

    connectSocket: () => {
        const {authUser} = get();

        if(!authUser || get().socket?.connected) return;

        const socket = io(baseURL);
        socket.connect();

        set({socket: socket});
    },

    disconnectSocket: () => {
        if(get().socket?.connected) get().socket.disconnect();
    },
}))