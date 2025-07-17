import { Server } from "socket.io";
import http from "http";
import express from "express";
import User from "../models/userSchema.js"
import ChatSession from "../models/chatSessionSchema.js";
import { findOrCreateChatSession } from "../services/sessionService.js";
import { saveMessage, generateBotReply } from "../services/messageService.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
    },
});

const MATCH_DELAY_MS = 7000;
let filteredQueue = [];

io.on("connection", (socket) => {
    console.log("A user has connected", socket.id);

    socket.on("joinQueue", async (userProfile) => {
        const userId = userProfile?.userId;
        const gender = userProfile?.gender || "";
        const country = userProfile?.country || "";
        const profession = userProfile?.profession || "";
        const mode = (!gender && !country && !profession) ? "random" : "filtered";
        const joinedAt = Date.now();

        if (filteredQueue.find(u => u.userId === userId)) return;

        filteredQueue.push({
            userId,
            socketId: socket.id,
            gender,
            country,
            profession,
            mode,
            joinedAt,
            profileGender: gender,
            profileCountry: country,
            profileProfession: profession,
        });

        const attemptMatch = async () => {
            const now = Date.now();
            const user = filteredQueue.find(u => u.userId === userId);
            if (!user) return; // Already matched or left

            if (now - user.joinedAt < MATCH_DELAY_MS) {
                // Wait longer before trying to match
                setTimeout(attemptMatch, 2000);
                return;
            }

            let matchIndex = -1;

            // Helper to check if user waited enough
            const waitedEnough = (u) => (now - u.joinedAt) >= MATCH_DELAY_MS;

            if (user.mode === "filtered") {
                // 1. Try matching filtered with filtered users who waited enough and satisfy filters
                matchIndex = filteredQueue.findIndex(u =>
                    u.userId !== userId &&
                    u.mode === "filtered" &&
                    waitedEnough(u) &&
                    (u.gender === "" || u.gender === user.gender) &&
                    (u.country === "" || u.country === user.country) &&
                    (u.profession === "" || u.profession === user.profession)
                );

                // 2. If none, try matching filtered with random users who waited enough and satisfy filtered user's filters
                if (matchIndex === -1) {
                    matchIndex = filteredQueue.findIndex(u =>
                        u.userId !== userId &&
                        u.mode === "random" &&
                        waitedEnough(u) &&
                        (u.profileGender === "" || u.profileGender === user.gender) &&
                        (u.profileCountry === "" || u.profileCountry === user.country) &&
                        (u.profileProfession === "" || u.profileProfession === user.profession)
                    );
                }

            } else {
                // mode === "random"

                // 3. Try matching random with random users who waited enough
                matchIndex = filteredQueue.findIndex(u =>
                    u.userId !== userId &&
                    u.mode === "random" &&
                    waitedEnough(u)
                );

                // 4. If none, try matching random with filtered users who waited enough and accept random user's profile
                if (matchIndex === -1) {
                    matchIndex = filteredQueue.findIndex(u =>
                        u.userId !== userId &&
                        u.mode === "filtered" &&
                        waitedEnough(u) &&
                        (user.gender === "" || u.gender === user.gender) &&
                        (user.country === "" || u.country === user.country) &&
                        (user.profession === "" || u.profession === user.profession)
                    );
                }
            }

            if (matchIndex !== -1) {
                const matchedUser = filteredQueue.splice(matchIndex, 1)[0];
                filteredQueue = filteredQueue.filter(u => u.userId !== userId);

                const chatSession = await findOrCreateChatSession(userId, matchedUser.userId);

                io.to(matchedUser.socketId).emit("user-paired", chatSession._id);
                io.to(socket.id).emit("user-paired", chatSession._id);
            } else {
                setTimeout(attemptMatch, 2000);
            }
        };

        setTimeout(attemptMatch, 2000);
    });


    socket.on("cancelQueue", (userId) => {
        filteredQueue = filteredQueue.filter(user => user.userId !== userId);
        socket.emit("queue-cancelled");
    });

    socket.on("joinRoom", (roomId) => {
        socket.join(roomId);
        console.log(`Socket ${socket.id} joined room ${roomId}`);
    });

    socket.on("sendMessage", async ({ roomId, senderId, content, images = [], isBotMessage = false }) => {
        try {
            console.log(roomId);
            const newMessage = await saveMessage({
                chatId: roomId,
                senderId,
                content,
                images,
            });

            // 2. Emit the message to both users in the room
            io.to(roomId).emit("receiveMessage", newMessage);

            const botUser = await User.findOne({ isBot: true });

            const isChatWithBot = await ChatSession.exists({
                _id: roomId,
                $or: [
                    { userA: senderId, userB: botUser._id },
                    { userA: botUser._id, userB: senderId }
                ]
            });


            if (!isBotMessage && isChatWithBot) {
                // Simulate bot typing or delay
                setTimeout(async () => {
                    const botReplyContent = await generateBotReply(content); // Your AI logic here

                    const botReply = await saveMessage({
                        chatId: roomId,
                        senderId: botUser._id,
                        content: botReplyContent,
                        images: [],
                    });

                    io.to(roomId).emit("receiveMessage", botReply);
                }, 1000); // Simulate a slight delay for realism
            }
        } catch (error) {
            console.error("Error saving message:", error);
            socket.emit("message-error", { message: "Failed to send message." });
        }
    });


    socket.on("disconnect", () => {
        console.log("A user has disconnected", socket.id);
        filteredQueue = filteredQueue.filter(user => user.socketId !== socket.id);
    });
});


export { io, app, server }