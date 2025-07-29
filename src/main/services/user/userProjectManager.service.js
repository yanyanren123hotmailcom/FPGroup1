
import connection from '../../config/db.js'; // 数据库连接配置


  /**
   * 根据用户ID查询其拥有的所有项目
   * @param {number|string} userId - 用户ID
   * @returns {Promise<Array>} 项目列表
   */
  export const getProjectsByUserId =async (user_id)=> {

    try {
      // 转换为整数确保SQL安全
      const id = parseInt(user_id, 10);
      console.log(`查询用户ID: ${id} 的项目列表`);
      if (isNaN(id) || id <= 0) {
        throw new Error('用户ID必须是正整数');
      }

      // 调用DAO层查询（示例查询）
      const projects = await connection.query(`
        SELECT * 
        FROM invest_holds 
        WHERE user_id = ? `, 
        [id]
      );

      return projects;
    } catch (error) {
      // 包装并向上抛出错误
      throw new Error(`查询项目失败: ${error.message}`);
    }
  }


