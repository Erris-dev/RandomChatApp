import Messages from '../models/messagesSchema.js';

import cloudinary from "../lib/cloudinary.js";

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
            chatId,
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
