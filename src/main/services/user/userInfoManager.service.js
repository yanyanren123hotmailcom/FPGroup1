import connection from '../../config/db.js';

export const getUserInfo = async (user_id) => {
    const [rows] = await connection.query('SELECT * FROM users where id=?',[user_id]);
    if (rows.length === 0) return null;
    return rows;
};

const getUserByID = async (id) => {
    const [rows] = await connection.query('SELECT * FROM users WHERE id = ?', [id]);
    if (rows.length === 0) return null;
    return rows[0];
}
export const updateUser = async (id, current_funds,current_earnings) => {
    
    const user = await getUserByID(id);
    if (!user) {
        console.error(`User with ID ${id} not found.`);
        return null;
    };

    // Use existing values if new ones aren't provided
    const updatedFunds = current_funds !== undefined
        ? Number(user.current_funds) + Number(current_funds)
        : Number(user.current_funds);
    const updatedEarnings = current_earnings != undefined
        ? Number(user.current_earnings)+Number(current_earnings)
        : user.current_earnings;
    console.log(updatedFunds,updatedEarnings,id);
    const [result] = await connection.query('UPDATE users SET current_funds = ? , current_earnings=? WHERE id = ?', [updatedFunds,updatedEarnings, user.id]);

    if (result.affectedRows === 0) return null;

    return { message: 'UserInfo updated successfully',
        id: parseInt(id) ,
        user_name:user.user_name,
        current_funds: updatedFunds,
        current_earnings:updatedEarnings};
};
