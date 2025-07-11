import { ChatSession } from '../models/chatSessionSchema.js';

export const findOrCreateChatSession = async (userA, userB) => {
    const [id1, id2] = [userA.toString(), userB.toString()].sort();

        let chatSession = await ChatSession.findOne({
            $or: [
                { userA: id1, userB: id2 },
                { userA: id2, userB: id1 },
            ]
        });

        if (!chatSession) {
            chatSession = await ChatSession.create({
                userA: id1,
                userB: id2,
            });
        }

    return chatSession
}