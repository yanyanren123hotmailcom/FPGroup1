import express from 'express';
import * as dbController from '../controllers/db.controller.js';

const router = express.Router();

router.get('/init', dbController.initDB);
router.get('/seed-data', dbController.seedData);

// export default router;
export { router as dbRoutes };
