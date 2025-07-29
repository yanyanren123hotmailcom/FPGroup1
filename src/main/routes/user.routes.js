
import express from 'express';
import * as userInfoManager from '../controllers/user/userInfoManager.controller.js';
import * as userProjectManager from '../controllers/user/userProjectManager.controller.js';
// import * as userLog from '../controllers/user/userLog.controller.js';

const userRoutes = express.Router();
userRoutes.get('/:user_id', userInfoManager.getUserInfo);
userRoutes.patch('/:user_id', userInfoManager.updateUser);


// userRoutes.get('/:user_id/log/list', userLog.getUserLogList);
// userRoutes.post('/:user_id/log', userLog.createUserLog);
// userRoutes.patch('/:user_id/log', userLog.updateUserLog);
//
//
userRoutes.get('/:user_id/invest/list', userProjectManager.getUserProjectList);
// userRoutes.get('/:user_id/invest/:project_id', userProjectManager.getUserProjectById);
// userRoutes.get('/:user_id/invest/project_name=:project_name', userProjectManager.getUserProjectByName);
// userRoutes.get('/:user_id/invest/type_name=:type_name', userProjectManager.getUserProjectByTypeName);
// userRoutes.get('/:user_id/invest/type', userProjectManager.getUserProjectLossAndProfit);
// userRoutes.post('/:user_id/invest', userProjectManager.createUserProject);
// userRoutes.patch('/:user_id/invest/:project_id', userProjectManager.updateUserProject);


export default userRoutes;
