import * as projectManagerService from '../../services/project/projectManager.service.js';

export const getProject = async (req, res) => {
    try {
        const projects = await projectManagerService.getAllProjects();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getProjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await projectManagerService.getProjectById(id);

        if (!project) {
            return res.status(404).json({ error: 'Car not found' });
        }

        res.json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getProjectByName = async (req, res) => {
    try {
        const { name } = req.params;
        const project = await projectManagerService.getProjectByName(name);

        if (!project) {
            return res.status(404).json({ error: 'Car not found' });
        }

        res.json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createInvest = async (req, res) => {
    try {
        const { project_name, type, rate, price } = req.body;
        if ( !project_name|| !type|| !rate|| !price ) {
            return res.status(400).json({ error: 'Please provide complete information about project' });
        }

        const result = await projectManagerService.createProject(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateProjectPrice = async (req, res) => {
    try {
        const { id } = req.params;
        const { price} = req.body;

        if (!price) {
            return res.status(400).json({ error: 'Please provide at least car name or color to update' });
        }

        const result = await projectManagerService.updateProjectPrice(id, req.body);

        if (!result) {
            return res.status(404).json({ error: 'Car not found' });
        }

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await projectManagerService.deleteProject(id);

        if (!result) {
            return res.status(404).json({ error: 'Car not found' });
        }

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
