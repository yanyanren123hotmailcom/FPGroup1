// const express = require('express');
// const {
// getUserIncomeExpend,
// addUserLogController,
// deleteUserLogsController,
// getUserTransactionLogsController
// } = require('../controllers/user/userLog.controller.js');
import express from 'express';
import {
    getUserIncomeExpend,
    addUserLogController,
    deleteUserLogsController,
    getUserTransactionLogsController
} from '../controllers/user/userLog.controller.js';

const router = express.Router();

// GET: 获取用户收入与支出
router.get('/user/:user_id/in-and-out', getUserIncomeExpend);

// POST: 添加用户日志
router.post('/user/:user_id/log', addUserLogController);

// DELETE: 删除用户日志
router.delete('/user/:user_id/log', deleteUserLogsController);

// 新增：获取用户交易记录 (符合图片路径)
router.get('/user/:user_id/log/list', getUserTransactionLogsController);

//module.exports = router;
export default router;