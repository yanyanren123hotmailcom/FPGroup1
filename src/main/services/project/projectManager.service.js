import connection from '../../config/db.js';

const getAllProjects = async () => {
    const [rows] = await connection.query('SELECT * FROM invest_projects');
    return rows;
};

const getProjectById = async (id) => {
    const [rows] = await connection.query('SELECT * FROM invest_projects WHERE id = ?', [id]);
    return rows[0];
};

// const getProjectByName = async (name) => {
//     const [rows] = await connection.query('SELECT * FROM invest_projects WHERE project_name = ?', [name]);
//     return rows[0];
// };
/**
 * 根据项目名称进行模糊查询（无分页）
 * @param {string} name - 项目名称关键词（支持部分匹配）
 * @returns {Promise<Array>} 匹配的项目列表
 */
const getProjectByName = async (name) => {
    // 验证输入有效性
    if (!name || typeof name !== 'string') {
        throw new Error('项目名称必须是有效的字符串');
    }
    
    // 清理和验证输入
    const keyword = name.trim().replace(/[%_]/g, '\\$&'); // 转义通配符
    
    // 构造安全搜索模式
    const searchPattern = `%${keyword}%`;
    const prefixPattern = `${keyword}%`; // 用于前缀匹配
    
    try {
        // 执行模糊查询
        const [rows] = await connection.query(`
            SELECT 
                *
            FROM invest_projects
            WHERE project_name LIKE ?
            ORDER BY 
                project_name LIKE ? DESC `, 
         [searchPattern, prefixPattern]);
        return rows;
    } catch (error) {
        console.error('项目搜索失败:', error.message);
        throw new Error('执行项目搜索时发生错误');
    }
};

const createProject = async (projectData) => {
    const {  project_name, type, price, rate,description,start_date } = projectData;
    const [result] = await connection.query(
        'INSERT INTO invest_projects (project_name, type,price, rate, description,start_date) VALUES (?, ?, ?, ?, ?, ?)',
        [project_name, type,price, rate, description,start_date]
    );
    return { message: 'Project added successfully', id: result.insertId };
};

const updateProjectPrice = async (id, projectData) => {
    const {  price } = projectData;

    // Get the current project data
    const project = await getProjectById(id);
    if (!project) return null;

    // Use existing values if new ones aren't provided
    const updatedPrice = price !== undefined ? price : project.price;

    const [result] = await connection.query(
        'UPDATE invest_projects SET price = ? WHERE id = ?',
        [updatedPrice, id]
    );

    if (result.affectedRows === 0) return null;

    return { message: 'Car updated successfully', id: parseInt(id) };
};

const deleteProject = async (id) => {
    const [result] = await connection.query('DELETE FROM invest_projects WHERE id = ?', [id]);

    if (result.affectedRows === 0) return null;

    return { message: 'Project deleted successfully', id: parseInt(id) };
};


export { getAllProjects, getProjectById, getProjectByName, createProject, updateProjectPrice, deleteProject };
