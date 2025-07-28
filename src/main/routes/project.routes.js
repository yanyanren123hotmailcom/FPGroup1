
import express from 'express';
import * as projectManagerController from '../controllers/project/projectManager.controller.js';

const router = express.Router();

router.get('/invest/list', projectManagerController.getProject);
router.patch('/invest/:id', projectManagerController.updateProjectPrice);
router.post('/invest', projectManagerController.createInvest);
router.get('/invest/:id', projectManagerController.getProjectById);
router.delete('/invest/:id', projectManagerController.deleteProject);
router.get('/invest/:projet_name', projectManagerController.getProjectByName);

export default router;
