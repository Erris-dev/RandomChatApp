import FriendsSchema from "../models/friendsSchema.js";

export const getFriends = async (req , res) => {
    try {
        const userId = req.user._id;
        
        const friends = await FriendsSchema.find({
            status: "accepted",
            $or: [{ requester: userId }, { recipient: userId }],
        }).populate("requester recipient","username email avatar").lean();

        const friendsProfiles = friends.map((f) => {
            return f.requester._id.toString() === userId.toString()
            ? f.recipient
            : f.requester;
        })

        res.status(200).json(friendsProfiles);
    } catch (error) {
        console.error("Error fetching friends: ", error);
        res.status(500).json({ message: "Internal server error"});
    }
}

export const sendFriendRequest = async (req, res) => {
    try {
        const senderId = req.user._id;
        const  {recipientId} = req.body;

        const existingRequest =  await FriendsSchema.findOne({
            $or: [
                { requester: senderId, recipient: recipientId},
                { requester: recipientId, recipient: senderId },
            ]
        })

        if (existingRequest) {
            switch (existingRequest.status) {
                case "pending":
                    return res.status(400).json({ message: "A friend request is already pending." });

                case "accepted":
                    return res.status(400).json({ message: "You are already friends." });

                case "declined":
                    existingRequest.requester = senderId;
                    existingRequest.recipient = recipientId;
                    existingRequest.status = "pending";
                    await existingRequest.save();
                    return res.status(200).json({ message: "Friend request re-sent." });

                case "blocked":
                    return res.status(403).json({ message: "Cannot send request. One user has blocked the other." });
            }
        }

        await FriendsSchema.create({
            requester: senderId,
            recipient: recipientId,
            status: "pending",
        });

        return res.status(200).json({ message: "Friend request sent." });
    } catch (error) {
        console.log("Error sending the request: ", error);
        res.status(500).json({ message: "Internal server error"});
    }
}

export const getPendingFriendRequest = async (req, res) => {
    try {
        const userId = req.user._id;

        const requests = await FriendsSchema.find({
            recipient: userId,
            status: "pending",
        }).populate("requester","username email avatar").lean();

        res.status(200).json(requests);
    } catch (error) {
        console.log("Error fetching friend requests: ", error);
        res.status(500).json({ message: "Error fetching requests"});
    }
}

export const acceptFriendRequests = async (req, res) => {
    try {
        const userId = req.user._id;
        const { requestId } = req.body;

        const request = await FriendsSchema.findOne({
            _id: requestId,
            recipient: userId,
            status: "pending",
        });

        if (!request) return res.status(404).json({ message: "Request not found or already handled"});

        request.status = "accepted";
        await request.save();

        res.status(200).json({ message: "Request accepted!"});
    } catch (error) {
        console.log("Error accepting friend request:", error);
        res.status(500).json({ message: "Error accepting request"});
    }
}

export const declineFriendRequest = async (req, res) => {
    try {
        const userId = req.user._id;
        const { requestId } = req.body;


        const request = await FriendsSchema.findOne({
            _id: requestId,
            recipient: userId,
            status: "pending",
        });

        if (!request) return res.status(404).json({ message: "Request not found or already handled"});
        
        request.status = "declined";
        await request.save();

        res.status(200).json({ message: "Request Cancelled"});

    } catch (error) {
        console.log("Error declining request", error);
        res.status(500).json({ message: "Error declining"});
    }
}

export const blockFriendRequest = async (req, res) => {
    try {
        const userId = req.user._id;
        const { requestId } = req.body;


        const request = await FriendsSchema.findOne({
            _id: requestId,
            recipient: userId,
            status: "pending",
        });

        if (!request) return res.status(404).json({ message: "Request not found or already handled"});
        
        request.status = "blocked";
        await request.save();

        res.status(200).json({ message: "Request Blocked"});

    } catch (error) {
        console.log("Error blocking request", error);
        res.status(500).json({ message: "Error blocking"});
    }
}

export const cancelFriendRequest = async (req, res) => {
    try {
        const userId = req.user._id;
        const { requestId } = req.body;

        const request = await FriendsSchema.findOne({
            _id: requestId,
            requester: userId,
            status: "pending",
        });

        if (!request) return res.status(404).json({ message: "Request not found or already processed" });

        await request.deleteOne();

        res.status(200).json({ message: "Friend request canceled." });
    } catch (error) {
        console.log("Error canceling friend request:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
