// const {
//     getUserIncomeAndExpenditure,
//     addUserLog,
//     deleteUserLogsByDate,
//     getUserTransactionLogs
//     } = require('../../services/user/userLog.service.js');
import {
  getUserIncomeAndExpenditure,
  addUserLog,
  deleteUserLogsByDate,
  getUserTransactionLogs
} from '../../services/user/userLog.service.js';
// 获取用户收入与支出
// 返回格式：{ income: 数字, expend: 数字 }
const getUserIncomeExpend = async (req, res) => {
  try {
    const { user_id } = req.params;

    // 验证 user_id 是否有效
    if (!user_id || isNaN(user_id)) {
      return res.status(400).json({ 
        error: '无效的用户ID,请输入数值类型的用户ID' 
      });
    }
    // 从服务层获取数据
    const result = await getUserIncomeAndExpenditure(user_id);
    if (!result) {
      console.log("result null")  
    }
    // 返回符合API规范的JSON响应
    res.status(200).json({
      income: result.income,
      expend: result.expend
    });
  } catch (error) {
    console.error('控制器错误:', error.message);
    res.status(500).json({
      error: '内部服务器错误',
      message: error.message
    });
  }
};

// 新增：添加用户日志控制器

const addUserLogController = async (req, res) => {
    try {
      const { user_id } = req.params;
      const { project_id, action, amount, price } = req.body;
  
      // 验证action有效性 (1=购买, 2=抛售)
      if (action !== 1 && action !== 2) {
        return res.status(400).json({
          error: '无效操作类型',
          message: 'action 必须为1(购买)或2(抛售)'
        });
      }
  
      // 验证金额数据
      if (isNaN(amount) || amount <= 0 || isNaN(price) || price <= 0) {
        return res.status(400).json({
          error: '无效金额数据',
          message: 'amount和price必须是正数'
        });
      }
  
      // 调用服务层添加日志
      const result = await addUserLog({
        user_id,
        project_id,
        action,
        amount,
        price
      });
  
      // 返回成功响应 (状态码201)
      res.status(201).json(result);
    } catch (error) {
      console.error('添加日志控制器错误:', error.message);
      
      // 处理已知错误类型
      if (error.message.includes('用户不存在') || error.message.includes('投资项目不存在')) {
        return res.status(404).json({
          error: '资源未找到',
          message: error.message
        });
      }
      
      // 其他错误
      res.status(500).json({
        error: '内部服务器错误',
        message: error.message || '未知错误'
      });
    }
  };
  

// 新增：删除日志控制器
const deleteUserLogsController = async (req, res) => {
    try {
      const { user_id } = req.params;
      const { begin_date, end_date } = req.body;
  
      // 验证用户ID有效性
      if (!user_id || isNaN(user_id)) {
        return res.status(400).json({
          error: '无效的用户ID',
          message: '请输入有效的用户ID'
        });
      }
  
      // 验证日期参数存在性
      if (!begin_date || !end_date) {
        return res.status(400).json({
          error: '缺少必要参数',
          message: 'begin_date和end_date是必需的'
        });
      }
  
      // 调用服务层删除日志
      const result = await deleteUserLogsByDate(user_id, begin_date, end_date);
  
      // 根据图片要求返回空对象 {} 和200状态码
      res.status(200).json({});
    } catch (error) {
      console.error('删除日志控制器错误:', error.message);
      
      // 处理特定错误
      if (error.message.includes('用户不存在')) {
        return res.status(404).json({
          error: '用户未找到',
          message: error.message
        });
      }
      
      if (error.message.includes('无效的日期格式') || 
          error.message.includes('开始日期不能晚于结束日期')) {
        return res.status(400).json({
          error: '无效的日期参数',
          message: error.message
        });
      }
      
      // 其他错误
      res.status(500).json({
        error: '内部服务器错误',
        message: error.message
      });
    }
  };
  
  //获取用户交易记录控制器
  const getUserTransactionLogsController = async (req, res) => {
    try {
      const { user_id } = req.params;
  
      // 验证用户ID有效性
      if (!user_id || isNaN(user_id)) {
        return res.status(400).json({
          error: '无效的用户ID',
          message: '请输入有效的用户ID'
        });
      }
  
      // 调用服务层获取交易记录
      const logs = await getUserTransactionLogs(user_id);
      
      // 格式化响应数据（严格匹配图片要求的字段名）
      const formattedLogs = logs.map(log => ({
        project_name: log.project_name,
        project_type_name: log.project_type_name,
        amount: log.amount,
        price: log.price,
        action: log.action,
        date: log.date
      }));
  
      res.status(200).json(formattedLogs);
    } catch (error) {
      console.error('获取交易记录控制器错误:', error.message);
      
      // 处理特定错误
      if (error.message.includes('用户不存在')) {
        return res.status(404).json({
          error: '用户未找到',
          message: error.message
        });
      }
      
      // 其他错误
      res.status(500).json({
        error: '内部服务器错误',
        message: error.message
      });
    }
  };
  
  // 导出所有控制器
  // module.exports ={ 
  //   getUserIncomeExpend, 
  //   addUserLogController,
  //   deleteUserLogsController,
  //   getUserTransactionLogsController
  // };
  export {
    getUserIncomeExpend,
    addUserLogController,
    deleteUserLogsController,
    getUserTransactionLogsController
};
  