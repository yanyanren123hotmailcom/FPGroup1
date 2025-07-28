import connection from '../../config/db.js';

const getUserInfo = async () => {
    const [rows] = await connection.query('SELECT * FROM users');
    return rows;
};

const getUserById = async (id) => {
    const [rows] = await connection.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
};
const updateUser = async (id, price) => {
    
    const user = await getUserById(id);
    if (!user) return null;

    // Use existing values if new ones aren't provided
    const updatedPrice = price != undefined ? user.price+price : user.price;

    const [result] = await connection.query('UPDATE users SET current_funds = ? WHERE id = ?',
        [updatedPrice, id]);

    if (result.affectedRows === 0) return null;

    return { message: 'UserInfo updated successfully', id: parseInt(id) ,user_name:user.name,current_price: updatedPrice};
};


export { getUserById, getUserInfo, updateUser };
