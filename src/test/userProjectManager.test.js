import  * as userProjectManager from '../main/services/user/userProjectManager.service.js';   
//根据用户ID查询其拥有的所有项目
describe('getProjectsByUserId', () => {
    test('should return projects for a valid user ID', async () => {
        const userId = 1; // Assuming this user exists
        const projects = await userProjectManager.getProjectsByUserId(userId);
        expect(projects).toBeDefined();
        expect(Array.isArray(projects)).toBe(true);
        expect(projects.length).toBeGreaterThan(0); // Assuming the user has projects
    });

    test('should throw error for invalid user ID', async () => {
        const userId = 'invalid'; // Invalid user ID
        await expect(userProjectManager.getProjectsByUserId(userId)).rejects.toThrow('用户ID必须是正整数');
    });
});
//修改投资项目的份额（购买或卖出）
describe('UpdateInvestmentProject', () => {
    test('should update investment project successfully for buy action', async () => {
        const userId = 1; // Assuming this user exists
        const projectId = 1; // Assuming this project exists
        const action = 1;
        const amount = 10; // Example amount

        const result = await userProjectManager.UpdateInvestmentProject(userId, projectId, action, amount);
        expect(result).toBeDefined();
        expect(result.message).toBe('成功');
    });

    test('should update investment project successfully for sell action', async () => {
        const userId = 1; // Assuming this user exists
        const projectId = 1; // Assuming this project exists
        const action = 2;
        const amount = 5; // Example amount

        const result = await userProjectManager.UpdateInvestmentProject(userId, projectId, action, amount);
        expect(result).toBeDefined();
        expect(result.message).toBe('成功');
    });


});
