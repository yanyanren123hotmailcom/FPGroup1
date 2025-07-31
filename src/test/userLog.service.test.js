import  * as userLog from '../main/services/user/userLog.service.js';   
// 添加用户日志

describe('addUserLog', () => {
    test('should add user log successfully', async () => {
        const userLogData = {
            user_id: 1, // Assuming this user exists
            project_id: 1, // Assuming this project exists
            action: 1,
            amount: 100,
            price: 50
        };
        const result = await userLog.addUserLog(userLogData);
        expect(result).toBeDefined();
        expect(result.logId).toBeGreaterThan(0);
        expect(result.message).toBe('日志添加成功');
    });

    test('should throw error for non-existent user', async () => {
        const userLogData = {
            user_id: 9999, // Assuming this user does not exist
            project_id: 1,
            action: 1,
            amount: 100,
            price: 50
        };
        await expect(userLog.addUserLog(userLogData)).rejects.toThrow('用户不存在');
    });

    test('should throw error for non-existent project', async () => {
        const userLogData = {
            user_id: 1,
            project_id: 9999, // Assuming this project does not exist
            action: 1,
            amount: 100,
            price: 50
        };
        await expect(userLog.addUserLog(userLogData)).rejects.toThrow('投资项目不存在');
    });
}
);

