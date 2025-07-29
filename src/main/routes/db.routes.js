// import express from 'express';
// import * as dbController from '../controllers/db.controller.js';

// const router = express.Router();

// router.get('/init', dbController.initDB);
// router.get('/seed-data', dbController.seedData);

// export default router;
// import express from 'express';
// import * as dbController from '../controllers/db.controller.js';
// import * as projectLogController from '../controllers/project/projectLog.controller.js';
const express = require('express');
const dbController = require('../controllers/db.controller.js');
const projectLogController = require('../controllers/project/projectLog.controller.js');
// import * as dbController from '../controllers/db.controller.js';
// import * as projectLogController from '../controllers/project/projectLog.controller.js';


const router = express.Router();

// ✅ 初始化数据库
router.get('/init', dbController.initDB);
router.get('/seed-data', dbController.seedData);

// ✅ 项目日志相关接口
router.get('/invest/log/:project_id', projectLogController.getProjectLog);
router.post('/invest/log', projectLogController.addProjectLog);
router.delete('/invest/log', projectLogController.deleteProjectLogs);

//export default router;
module.exports = router;
