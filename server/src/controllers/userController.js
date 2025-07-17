import User from '../models/userSchema.js';
// Seeder or startup script
export const createBotUser = async () => {
  const bot = await User.findOne({ email: "bot@system.com" });
  if (!bot) {
    await User.create({
      username: "ChatBot",
      password: 'eee1111',
      email: "bot@system.com",
      avatar: "https://yourdomain.com/chatbot.png",
      isBot: true,
    });
  }
};
