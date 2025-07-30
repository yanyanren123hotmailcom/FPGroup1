//const connection = require('../../config/db.js');
import connection from '../../config/db.js';
// 添加用户日志
const addUserLog = async (userLogData) => {
    try {
      const { user_id, project_id, action, amount, price} = userLogData;
      // 验证用户是否存在
      const [user] = await connection.query(
        'SELECT id FROM users WHERE id = ?', 
        [user_id]
      );
      if (user.length === 0) {
        throw new Error('用户不存在');
      }
      // 验证项目是否存在
      const [project] = await connection.query(
        'SELECT id FROM invest_projects WHERE id = ?', 
        [project_id]
      );
      if (project.length === 0) {
        throw new Error('投资项目不存在');
      }
      // ***插入日志到数据库
      const [result] = await connection.query(
        'INSERT INTO user_logs (user_id, action, project_id, amount, price, date) VALUES (?, ?, ?, ?, ?, NOW())',
        [user_id, action, project_id, amount, price]
      );
  
      return {
        logId: result.insertId,
        message: '日志添加成功'
      };
    } catch (error) {
      console.error('添加用户日志时出错:', error);
      throw new Error(error.message || '添加日志失败');
    }
  };

// 删除用户日志

  const deleteUserLogsByDate = async (userId, beginDate, endDate) => {
    try {
      // 验证用户是否存在
      const [user] = await connection.query(
        'SELECT id FROM users WHERE id = ?', 
        [userId]
      );
      
      if (user.length === 0) {
        throw new Error('用户不存在');
      }
  
      // 验证日期有效性
      if (isNaN(new Date(beginDate).getTime()) || 
          isNaN(new Date(endDate).getTime())) {
        throw new Error('无效的日期格式');
      }
      
      if (new Date(beginDate) > new Date(endDate)) {
        throw new Error('开始日期不能晚于结束日期');
      }
  
      // 执行删除操作date >= ? AND date < DATE_ADD(?, INTERVAL 1 DAY)
      const [result] = await connection.query(
        `DELETE FROM user_logs 
         WHERE user_id = ? 
           AND DATE(date) BETWEEN ? AND ?`,
        [userId, beginDate, endDate]
      );
  
      return {
        affectedRows: result.affectedRows,
        message: '日志删除成功'
      };
    } catch (error) {
      console.error('删除日志时出错:', error);
      throw new Error(error.message || '删除日志失败');
    }
  };



// 获取用户收入与支出
const getUserIncomeAndExpenditure = async (userId) => {
  try {
    // 验证 userId
    if (!userId || isNaN(userId)) {
      throw new Error('无效的用户ID');
    }
    //定义结果数组
    let result= [];
    // 循环计算前七天的当天的收入与支出
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const [in_and_out] = await connection.query(
        `SELECT 
           COALESCE(SUM(CASE WHEN action = 2 THEN amount * price ELSE 0 END), 0) AS income,
           COALESCE(SUM(CASE WHEN action = 1 THEN amount * price ELSE 0 END), 0) AS expend
        FROM user_logs
        WHERE user_id = ? 
              AND date >= ?
              AND date < ? + INTERVAL 1 DAY`,
          [userId, date.toISOString().split('T')[0], date.toISOString().split('T')[0]]
      );
      console.log(in_and_out);

      // 将收入和支出差值添加到结果数组
      result.push(in_and_out[0].income - in_and_out[0].expend);
  }
    return result;
  } catch (error) {
    console.error('获取用户收支时出错:', error);
    throw new Error(`获取用户收支失败: ${error.message}`);
  }
};



// 获取用户所有交易记录
// 包括项目名称、类型、金额、价格、操作类型和日期
const getUserTransactionLogs = async (userId) => {
    try {
      // 验证用户是否存在
      const [user] = await connection.query(
        'SELECT id FROM users WHERE id = ?', 
        [userId]
      );
      
      if (user.length === 0) {
        throw new Error('用户不存在');
      }
  
      // 获取用户所有交易记录（连表查询）
      const [logs] = await connection.query(
        `SELECT 
           p.project_name, 
           p.type AS project_type_name,
           l.amount,
           l.price,
           l.action,
           DATE_FORMAT(l.date, '%Y-%m-%d %H:%i:%s') AS date
         FROM user_logs l
         JOIN invest_projects p ON l.project_id = p.id
         WHERE l.user_id = ?
         ORDER BY l.date DESC`,
        [userId]
      );
  
      return logs;
    } catch (error) {
      console.error('获取交易记录时出错:', error);
      throw new Error(error.message || '获取交易记录失败');
    }
  };
  
  // 导出所有函数
  // module.exports = { 
  //   getUserIncomeAndExpenditure, 
  //   addUserLog,
  //   deleteUserLogsByDate,
  //   getUserTransactionLogs
  // };
  export {
    getUserIncomeAndExpenditure,
    addUserLog,
    deleteUserLogsByDate,
    getUserTransactionLogs
};