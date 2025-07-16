import { Router } from 'express';
import { getChatPartnerInfo, openChatSessionWithFriend, getMessagesForSession } from "../controllers/messagesController.js";
import { saveOrUpdateImages, getSavedImages } from '../controllers/SaveImagesController.js';
import { authenticateToken } from '../lib/utils.js';

const router = Router()

router.get('/getPartnerInfo/:Id', authenticateToken, getChatPartnerInfo );

router.get('/loadMessages/:sessionId', authenticateToken, getMessagesForSession);

router.post('/openChat', authenticateToken, openChatSessionWithFriend);

router.post('/saveImage', authenticateToken, saveOrUpdateImages );

router.get('/fetchSavedImages', authenticateToken, getSavedImages);


export default router