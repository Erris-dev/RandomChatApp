import { Server } from "socket.io";
import http from "http";
import express from "express";
import { findOrCreateChatSession } from "../services/sessionService.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
    },
});


let queue = [];

io.on("connection", (socket) => {
    console.log("A user has connected", socket.id);

    socket.on("joinQueue", async (userId) => {
        console.log(`joinQueue from socket ${socket.id}: userId =`, userId);

        if(queue.find(user => user.userId === userId)) return;

        queue.push({ userId, socketId: socket.id });

        if(queue.length >= 2) {
            const user1 = queue.shift();
            const user2 = queue.shift();

            const chatSession = await findOrCreateChatSession(user1.userId, user2.userId);

            io.to(user1.socketId).emit("user-paired", chatSession._id);
            io.to(user2.socketId).emit("user-paired", chatSession._id);
        }
    });

    socket.on("cancelQueue", (userId) => {
        queue = queue.filter(user => user.userId !== userId);
        socket.emit("queue-cancelled");
    });


    socket.on("disconnect", () => {
        console.log("A user has disconnected", socket.id);
        queue = queue.filter(user => user.socketId !== socket.id);
    });
});


export {io, app, server}