
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

   /**
     * 购买投资项目
     * @param {number|string} user_Id - 用户ID
     * @param {number|string} project_Id - 项目ID
     * @param {number} amount - 投资金额
     */
   export const UpdateInvestmentProject =async (user_id, project_id,action, amount)=> {
    // 验证参数有效性
    if (!user_id || !project_id || !action || isNaN(amount) || amount <= 0) {
        throw new Error('无效的用户ID、项目ID或投资金额参数');
    }

    try {
        
        const [projects] = await connection.query(`
            SELECT id, project_name, type, price 
            FROM invest_projects 
            WHERE id = ? `, 
            [project_id]
          );
      
          if (projects.length === 0) {
            throw new Error('项目不存在或不可购买');
          }
      
          const project = projects[0];
          const holdPrice = amount * project.price; // 在JS中计算金额
      
          // 2. 获取用户信息（示例）
          const [users] = await connection.query(
            `SELECT user_name FROM users WHERE id = ?`,
            [parseInt(user_id, 10)]
          );
          if (users.length === 0) {
            throw new Error('用户不存在');
          }
          const userName = users[0].user_name;
      
          const [current_hold_project]=await connection.query(`
            SELECT * from invest_holds 
            WHERE user_id = ? AND project_id = ?`,  
            [parseInt(user_id, 10), parseInt(project_id, 10)]
          );

          if (current_hold_project.length > 0) {
            if (action == 'buy') {
                // 如果是购买操作，更新持有记录

                await connection.query(`
                    UPDATE invest_holds 
                    SET amount = amount + ?, hold_price = hold_price + ? 
                    WHERE user_id = ? AND project_id = ?`,
                    [amount, holdPrice, user_id, project_id]
                );
            }else if (action == 'sell') {
            // 如果卖项目，更新持有记录
            const currentAmount = current_hold_project[0].amount;
            if (currentAmount < amount) {
                throw new Error('卖出金额超过持有金额');
            }else if (currentAmount == amount) {
            // 如果卖出金额等于持有金额，删除持有记录
            await connection.query(`
              DELETE FROM invest_holds 
              WHERE user_id = ? AND project_id = ?`,
              [user_id, project_id]
            );}else{
            // 如果卖出金额小于持有金额，更新持有记录
            await connection.query(`
                UPDATE invest_holds 
                SET amount = amount - ?, hold_price = hold_price - ? 
                WHERE user_id = ? AND project_id = ?`,
                [amount, holdPrice, user_id, project_id]
              );
            }
            
        }
          }else{
            // 3. 插入持有记录
          await connection.query(`
            INSERT INTO invest_holds (
              user_id, 
              user_name, 
              project_name, 
              project_type, 
              project_id, 
              amount, 
              hold_price
            ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
              user_id,
              userName,
              project.project_name,
              project.type,
              project.id,
              amount,
              holdPrice
            ]
          );
          }

          // 4. 更新用户的总投资金额（示例）
          if (action === 'buy') {
          // 如果是购买操作，增加用户的总投资金额
            await connection.query(`
                UPDATE users 
                SET current_funds = current_funds - ? 
                WHERE id = ?`,
                [holdPrice, user_id]
            );
            }else if (action === 'sell') {
            // 如果是卖出操作，减少用户的总投资金额
                await connection.query(`
                UPDATE users
                SET current_funds = current_funds + ? 
                WHERE id = ?`,  
                [holdPrice, user_id]
                );
            }
      //5.添加user_logs记录
      if (action === 'buy') {
        await connection.query(`    
            INSERT INTO user_logs (user_id, action, project_id, amount, date, price) 
            VALUES (?, 1, ?, ?, NOW(),?)`,
            [user_id, project_id, amount,project.price]
        );}else if (action === 'sell') {
        await connection.query(`
            INSERT INTO user_logs (user_id, action, project_id, amount, date, price) 
            VALUES (?, 2, ?, ?, NOW(),?)`,
            [user_id, project_id, amount,project.price]
        );}

        return { message: '成功' };
    } catch (error) {
        // 包装并向上抛出错误
        throw new Error(`购买投资项目失败: ${error.message}`);
    }
    }


