import { Router } from "express";
import {
  getFriends,
  getPendingFriendRequest,
  sendFriendRequest,
  acceptFriendRequests,
  declineFriendRequest,
  blockFriendRequest,
  cancelFriendRequest,
} from "../controllers/friendsController.js";
import { authenticateToken } from "../lib/utils.js";

const router = Router();

// Get all friends for authenticated user
router.get("/all", authenticateToken, getFriends);

// Get pending requests sent *to* user
router.get("/pending", authenticateToken, getPendingFriendRequest);

// Send a new friend request
router.post("/send", authenticateToken, sendFriendRequest);

// Accept a pending request
router.post("/accept", authenticateToken, acceptFriendRequests);

// Decline a pending request
router.post("/decline", authenticateToken, declineFriendRequest);

// Block a request (turns status to "blocked")
router.post("/block", authenticateToken, blockFriendRequest);

// Cancel an outgoing pending request
router.post("/cancel", authenticateToken, cancelFriendRequest);

export default router;
