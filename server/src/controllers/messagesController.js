import { User } from '../models/userSchema.js';
import { Friend } from '../models/friendsSchema.js';
import { ChatSession } from '../models/chatSessionSchema.js';
import { Message } from '../models/messagesSchema.js';

export const getFriendsForSidebar = async (req, res ) => {
    try {
        const userId = req.user._id;

        // Find all friends of the user
        const friends = await Friend.find({
            $or: [
                { requester: userId, status: 'accepted' },
                { recipient: userId, status: 'accepted' }
            ]
        }).populate('requester recipient', 'username avatar');

        res.status(200).json(friends);
    } catch (error) {
        console.error("Error fetching friends for sidebar:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const openChatSessionWithFriend = async (req, res) => {
    try {
        const { friendId } = req.params;
        const userId = req.user._id;

        // Check if the friend exists
        const friend = await User.findById(friendId);
        if (!friend) {
            return res.status(404).json({ message: "Friend not found" });
        }

        // Find or create a chat session with the friend
        let chatSession = await ChatSession.findOne({
            participants: { $all: [userId, friendId] }
        });

        if (!chatSession) {
            chatSession = await ChatSession.create({
                participants: [userId, friendId]
            });
        }

        res.status(200).json(chatSession);
    } catch (error) {
        console.error("Error opening chat session with friend:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

