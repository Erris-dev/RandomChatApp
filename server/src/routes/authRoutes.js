import { Router } from "express";
import { createUser, loginUser, logoutUser, checkAuth} from "../controllers/authController.js";
import { refreshAccessToken } from "../middleware/utils.js";
import { authenticateToken } from "../middleware/utils.js";

const router = Router();

//Route to create a new user
router.post("/register", createUser);

//Route to login a user
router.post("/login", loginUser);

//Route to logout a user
router.post('/logout', logoutUser);

//Route to refresh access token
router.post('/refresh-token', refreshAccessToken);

//Route to check authentication
router.get('/check-auth',authenticateToken, checkAuth);

//Export the router
export default router;