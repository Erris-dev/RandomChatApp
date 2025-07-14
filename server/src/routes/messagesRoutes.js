import { Router } from 'express';
import { getChatPartnerInfo, openChatSessionWithFriend, getMessagesForSession } from "../controllers/messagesController.js";
import { authenticateToken } from '../lib/utils.js';
import { get } from 'mongoose';

const router = Router()

router.get('/getPartnerInfo/:Id', authenticateToken, getChatPartnerInfo );

router.get('/loadMessages/:sessionId', authenticateToken, getMessagesForSession);

router.post('/openChat', authenticateToken, openChatSessionWithFriend);





export default router