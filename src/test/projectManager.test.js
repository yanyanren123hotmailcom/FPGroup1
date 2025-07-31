import  * as projectManager from '../main/services/project/projectManager.service.js';
//getAllProjects
describe('getAllProjects', () => {
    test('should return all projects', async () => {
        const projects = await projectManager.getAllProjects();
        expect(projects).toBeDefined();
        expect(Array.isArray(projects)).toBe(true);
        expect(projects.length).toBeGreaterThan(0); // Assuming there are projects in the database
    });
});

//getProjectById
describe('getProjectById', () => {
    test('should return project for a valid ID', async () => {
        const projectId = 1; // Assuming this project exists
        const project = await projectManager.getProjectById(projectId);
        expect(project).toBeDefined();
        expect(project.id).toBe(projectId);
    });

 
});