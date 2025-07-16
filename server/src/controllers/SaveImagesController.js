import SavedImage from "../models/savedImageSchema.js";

export const saveOrUpdateImages = async (req, res) => {
  try {
      console.log("saveOrUpdateImages - received body:", req.body);

    const { sessionId, images } = req.body;

    if (!sessionId || !Array.isArray(images) || images.length === 0) {
      return res.status(400).json({ success: false, error: "Invalid input" });
    }

    const result = await SavedImage.findOneAndUpdate(
      { sessionId },
      { $push: { images: { $each: images } } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return res.status(200).json({result });
  } catch (error) {
    console.error("Error saving or updating images:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getSavedImages = async(req, res) => {
    try {
        const { sessionId } = req.query

        const savedImages =await SavedImage.find({sessionId}).sort({ createdAt: 1}).lean();

        if(!savedImages) return res.status(400).json({ message: "Images not found"});
        
        return res.status(200).json(savedImages);        
    } catch (error) {
        console.error("Error getting saved images", error);
        return res.status(500).json({message: "Internal server error"});
    }
}
