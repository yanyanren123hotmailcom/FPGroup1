import  * as userInfoManager from '../main/services/user/userInfoManager.service.js';
// const userInfoManager = require('../main/services/user/userInfoManager.service.js');

// 然后继续写测试
//test for getUserInfo
describe('getUserInfo', () => {
    test('getUserInfo should return user info postive test', async () => {
        const id=1;
        const result = await userInfoManager.getUserInfo(id);
        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThan(0);
    });
    test('getUserInfo should return undefined for an invalid id', async () => {
        const userId = 9999; // Assuming this ID does not exist in your database
        const result = await userInfoManager.getUserInfo(userId);
        expect(result).toBeNull();
    });
});

describe('updateUser', () => {
    test('updateUser should update user info for a valid id', async () => {
        const userId = 1; // Assuming this ID exists in your database
        const fundsToUpdate = 100; // Example price to update
        const eariningToUpdate=30;
        const result = await userInfoManager.updateUser(userId, fundsToUpdate,eariningToUpdate);
        expect(result).toBeDefined();
        expect(result.message).toBe('UserInfo updated successfully');
        expect(result.id).toBe(userId);
    });

    test('updateUser should return null for an invalid id', async () => {
        const userId = 9999; // Assuming this ID does not exist in your database
        const result = await userInfoManager.updateUser(userId, 100,-30);
        expect(result).toBeNull();
    });
}   );