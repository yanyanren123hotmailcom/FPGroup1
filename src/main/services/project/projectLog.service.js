import connection from '../../config/db.js';

/**
 * Get project logs for the past week by project ID
 * @param {number} projectId 
 * @returns {Promise<Array>} Array of logs with date, rate, price
 */
export const getLogByProjectId = async (projectId) => {
    const sql = `
        SELECT 
            DATE_FORMAT(date, '%Y-%m-%d') as date,
            rate,
            price
        FROM project_logs
        WHERE project_id = ? 
          AND date >= DATE_SUB(NOW(), INTERVAL 7 DAY)
        ORDER BY date ASC
    `;
    const [rows] = await connection.query(sql, [projectId]);
    return rows;
};

/**
 * Insert a new project log entry
 * @param {Object} param0
 * @param {string} param0.date - Date string
 * @param {number} param0.project_id - Project ID
 * @param {number} param0.rate - Project rate
 * @param {number} param0.price - Project price
 */
export const addLog = async ({ date, project_id, rate, price }) => {
    const sql = `
        INSERT INTO project_logs (date, project_id, rate, price, action)
        VALUES (?, ?, ?, ?, 2)
    `;
    await connection.query(sql, [date, project_id, rate, price]);
};

/**
 * Delete logs between specified dates (inclusive)
 * @param {string} begin - Start date string (YYYY-MM-DD)
 * @param {string} end - End date string (YYYY-MM-DD)
 * @returns {Promise<Object>} Result of the delete query
 */
export const deleteLogsBetweenDates = async (begin, end) => {
    const sql = `
        DELETE FROM project_logs 
        WHERE date BETWEEN ? AND ?
    `;
    const [result] = await connection.query(sql, [begin, end]);
    return result;
};
