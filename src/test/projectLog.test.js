import  * as projectLog from '../main/services/project/projectLog.service.js';
//export const addLog = async ({ date, project_id, rate, price }) => {
// 添加项目日志
describe('addLog', () => {
    test('should add project log successfully', async () => {
        const logData = {
            date: '2023-10-01',
            project_id: 1, // Assuming this project exists
            rate: 5,
            price: 1000
        };
        const result = await projectLog.addLog(logData);
        expect(logData.price).toBe(1000);
    });

    test('should throw error for non-existent project', async () => {
        const logData = {
            date: '2023-10-01',
            project_id: 9999, // Assuming this project does not exist
            rate: 5,
            price: 1000
        };
        await expect(projectLog.addLog(logData)).rejects.toThrow('Cannot add or update a child row: a foreign key constraint fails (`finance`.`project_logs`, CONSTRAINT `project_logs_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `invest_projects` (`id`))');
    });
});