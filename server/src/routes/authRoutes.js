import { Router } from "express";
import { createUser, loginUser, logoutUser} from "../controllers/authController.js";
import { refreshAccessToken } from "../middleware/utils.js";

const router = Router();

//Route to create a new user
router.post("/register", createUser);

//Route to login a user
router.post("/login", loginUser);

//Route to logout a user
router.post('/logout', logoutUser);

//Route to refresh access token
router.post('/refresh-token', refreshAccessToken);

//Export the router
export default router;