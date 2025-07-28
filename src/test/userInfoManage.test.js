import  {getUserById, getUserInfo, updateUser} from '../main/services/user/userInfoMananger.service.js';

//test for getUserInfo
describe('getUserInfo', () => {
    test('getUserInfo should return user info postive test', async () => {
        const result = await getUserInfo();
        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThan(0);
    });
});

describe('getUserById', () => {
    test('getUserById should return user info for a valid id', async () => {
        const userId = 1; // Assuming this ID exists in your database
        const result = await getUserById(userId);
        expect(result).toBeDefined();
        expect(result.id).toBe(userId);
    });

    test('getUserById should return undefined for an invalid id', async () => {
        const userId = 9999; // Assuming this ID does not exist in your database
        const result = await getUserById(userId);
        expect(result).toBeUndefined();
    });
});

describe('updateUser', () => {
    test('updateUser should update user info for a valid id', async () => {
        const userId = 1; // Assuming this ID exists in your database
        const priceToUpdate = 100; // Example price to update
        const result = await updateUser(userId, priceToUpdate);
        expect(result).toBeDefined();
        expect(result.message).toBe('UserInfo updated successfully');
        expect(result.id).toBe(userId);
        expect(result.hold_price).toBeGreaterThan(0); // Assuming the price is updated correctly
    });

    test('updateUser should return null for an invalid id', async () => {
        const userId = 9999; // Assuming this ID does not exist in your database
        const result = await updateUser(userId, 100);
        expect(result).toBeNull();
    });
}   );