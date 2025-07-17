import Messages from '../models/messagesSchema.js';
import cloudinary from "../lib/cloudinary.js";
import dotenv from 'dotenv';
dotenv.config();
import { Groq } from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const saveMessage = async ({ chatId, senderId, content, images }) => {
    try {
        let uploadedImages = [];

        if (images && images.length > 0) {
            // Upload each image to Cloudinary
            const uploadPromises = images.map(async (base64Image) => {
                const result = await cloudinary.uploader.upload(base64Image, {
                    folder: "chat_images",
                    resource_type: "image",
                });
                return result.secure_url;
            });

            uploadedImages = await Promise.all(uploadPromises);
        }

        // Create and save message
        const message = new Messages({
            sessionId: chatId,
            senderId,
            content,
            images: uploadedImages,
        });

        await message.save();
        return message;

    } catch (error) {
        console.error("Error saving message:", error);
        throw new Error("Failed to save message");
    }
};


export const generateBotReply = async (userMessage) => {
  try {
    const completion = await groq.chat.completions.create({
      model: "llama3-70b-8192", // or any available LLaMA model from GROQ
      messages: [
        {
          role: "system",
          content: "You are a helpful and friendly chatbot assistant."
        },
        {
          role: "user",
          content: userMessage
        }
      ],
      max_completion_tokens: 150,
      temperature: 0.7,
      top_p: 1,
      stream: false,
      stop: null,
    });

    return completion.choices[0].message.content.trim();
  } catch (error) {
    // GROQ errors might not have same structure as OpenAI, adjust accordingly
    if (
      error.code === "RESOURCE_EXHAUSTED" || // GROQ quota error code
      error.status === 429
    ) {
      console.warn("GROQ quota exceeded:", error.message);
      return "Sorry, AI services are temporarily unavailable due to usage limits. Please try again later.";
    }
    throw error;
  }
}


// Wrap your function with limiter

