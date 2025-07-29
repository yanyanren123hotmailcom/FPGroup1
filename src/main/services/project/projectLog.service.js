
const { getProjectLog } = require('./projectLog.service.js');
// 获取指定项目一周内的波动情况
export const getProjectLog = async (req, res) => {
    const { project_id } = req.params;  // 获取 path 参数中的 project_id

    try {
        // 查询过去7天内的项目价格波动
        const [rows] = await connection.query(
            `SELECT 
                DATE(date) AS date,  // 获取日期
                rate  // 获取项目的波动率
             FROM project_logs  // 使用 project_logs 表
             WHERE project_id = ?  // 指定项目ID
               AND date >= '2025-07-25'  // 过滤日期范围：2025-07-25 至 2025-07-28
               AND date <= '2025-07-28'
             ORDER BY date ASC`,  // 按日期升序排序
            [project_id]
        );

        // 返回成功的响应，包含项目的价格波动情况
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching project log:', error);
        // 返回错误的响应
        res.status(500).json({ error: 'Internal server error' });
    }
};
module.exports = { getProjectLog };


// // 添加日志（默认 user_id = 0，action = 0，amount = 0）
// export const addProjectLog = async (req, res) => {
//     const { date, priject_id, rate, price } = req.body;
//     const project_id = priject_id; // 保持兼容拼写错误

//     try {
//         await connection.query(
//             `INSERT INTO user_logs (user_id, action, project_id, amount, price, date)
//              VALUES (?, ?, ?, ?, ?, ?)`,
//             [0, 0, project_id, 0, price, date]
//         );

//         res.status(201).json({});
//     } catch (error) {
//         console.error('Error adding project log:', error);
//         res.status(500).json({ error: 'Failed to add project log' });
//     }
// };

// // 删除指定时间范围内的日志
// export const deleteProjectLogs = async (req, res) => {
//     const { begin, e } = req.body;

//     try {
//         await connection.query(
//             `DELETE FROM user_logs WHERE date >= ? AND date <= ?`,
//             [begin, e]
//         );

//         res.status(200).json({});
//     } catch (error) {
//         console.error('Error deleting project logs:', error);
//         res.status(500).json({ error: 'Failed to delete project logs' });
//     }
// };