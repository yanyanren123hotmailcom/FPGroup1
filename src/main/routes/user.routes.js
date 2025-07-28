
import express from 'express';
import * as userInfoManager from '../controllers/user/userInfoManager.controller.js';
import * as userProjectManager from '../controllers/user/userProjectManager.controller.js';
import * as userLog from '../controllers/user/userLog.controller.js';

const router = express.Router();
router.get('/:user_id', userInfoManager.getUserInfo);
router.patch('/:user_id', userInfoManager.updateUser);


router.get('/:user_id/log/list', userLog.getUserLogList);
router.post('/:user_id/log', userLog.createUserLog);
router.patch('/:user_id/log', userLog.updateUserLog);


router.get('/:user_id/invest/list', userProjectManager.getUserProjectList);
router.get('/:user_id/invest/:project_id', userProjectManager.getUserProjectById);
router.get('/:user_id/invest/project_name=:project_name', userProjectManager.getUserProjectByName);
router.get('/:user_id/invest/type_name=:type_name', userProjectManager.getUserProjectByTypeName);
router.get('/:user_id/invest/type', userProjectManager.getUserProjectLossAndProfit);
router.post('/:user_id/invest', userProjectManager.createUserProject);
router.patch('/:user_id/invest/:project_id', userProjectManager.updateUserProject);


export {router as userRoutes};
