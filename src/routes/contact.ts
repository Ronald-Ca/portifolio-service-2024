import { Router } from 'express';
import { sendContact } from '../controllers/contact-controller';
import { asyncHandler } from '../middlewares/error-handler';

const router = Router();

router.post('/', asyncHandler(sendContact));

export default router; 