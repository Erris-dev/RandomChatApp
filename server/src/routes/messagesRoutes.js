import { Router } from 'express';
import { getChatPartnerInfo } from "../controllers/messagesController.js";
import { authenticateToken } from '../lib/utils.js';

const router = Router()

router.get('/getPartnerInfo/:Id', authenticateToken, getChatPartnerInfo );



export default router