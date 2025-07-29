import express from 'express';
import {
    getLogByProjectId,
    addLog,
    deleteLogsBetweenDates
} from '../controllers/project/projectLog.controller.js';

const router = express.Router();

router.get('/invest/log/:project_id', getLogByProjectId);
router.post('/invest/log', addLog);
router.delete('/invest/log', deleteLogsBetweenDates);

export default router;
