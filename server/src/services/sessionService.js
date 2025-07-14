import ChatSession from '../models/chatSessionSchema.js';

export const findOrCreateChatSession = async (userA, userB) => {
  const [id1, id2] = [userA.toString(), userB.toString()].sort();
  const chatKey = `${id1}_${id2}`; // consistent pair identifier

  try {
    const chatSession = await ChatSession.findOneAndUpdate(
      { chatKey },
      {
        $setOnInsert: {
          userA: id1,
          userB: id2,
          chatKey,
        },
      },
      {
        new: true,
        upsert: true,
      }
    );

    return chatSession;
  } catch (error) {
    console.error("Error in findOrCreateChatSession:", error);
    throw error;
  }
};
