import User  from '../models/userSchema.js';
import mongoose from "mongoose"
import ChatSession from '../models/chatSessionSchema.js'
import Message  from '../models/messagesSchema.js';
import { findOrCreateChatSession } from '../services/sessionService.js';

export const openChatSessionWithFriend = async (req, res) => {
    try {
        const { friendId } = req.body;
        console.log(friendId)
        const userId = req.user._id;

        // Validate user exists
        const friend = await User.findById(friendId);
        console.log(friend);
        if (!friend) {
            
            return res.status(404).json({ message: "Friend not found" });
        }

        // Find or create chat session
        const chatSession = await findOrCreateChatSession(userId, friendId);

        res.status(200).json({
            session: chatSession,
        });
    } catch (error) {
        console.log("Error opening chat session with friend:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getMessagesForSession = async (req, res) => {
    try {
        const sessionId = req.params.sessionId

        const messages = await Message.find( { sessionId })
            .sort({ createdAt: 1 })
            .lean();

        res.status(200).json(messages);
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};




export const getChatPartnerInfo = async (req, res) => {
    try {
        const chatSessionId = req.params.Id;
        const currentUserId = req.user._id;

        const session = await ChatSession.findById(chatSessionId).lean();
        if (!session) {
            return res.status(400).json({ message: "Chat Session Not Found" });
        }

        const partnerId = session.userA.toString() === currentUserId.toString()
            ? session.userB
            : session.userA;

        const partnerUser = await User.findById(partnerId).select("-password").lean(); // .lean() returns plain JS object

        if (!partnerUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(partnerUser); // ✅ plain object, safe to send
    } catch (error) {
        console.error("Error fetching partner info:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};



