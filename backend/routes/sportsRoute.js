import express from 'express';
import { isAuthenticated } from '../middleware/authMiddleware.js';
import { getSportDetailsFacilityWiseController, getSportsController, getSportsDetailsDayWiseController } from '../controllers/sportsController.js';

const router = express.Router(); 

router.post('/sports-details-by-date-and-time-and-sport-id', isAuthenticated, getSportsController);
router.get('/sports-details-facility-wise', isAuthenticated, getSportDetailsFacilityWiseController);
router.get('/sports-details-day-wise', isAuthenticated, getSportsDetailsDayWiseController);

export default router;