import express from 'express';
import * as userProjectManagerService from '../../services/user/userProjectManager.service.js';

const router = express.Router();

// 根据 user_id 查询拥有的项目
export const getUserProjectList= async (req, res) => {
    const { user_id } = req.params;

    try {
        const projects = await userProjectManagerService.getProjectsByUserId(user_id);
        res.status(200).json({"data":projects} );
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch projects' });
    }
};

//购买投资项目
export const updateUserProject = async (req, res) => {
    const { user_id,project_id } = req.params;
    const { action, amount } = req.body;
    console.log(`Updating project for user ${user_id}, project ${project_id}, action: ${action}, amount: ${amount}`);

    if (!project_id || !amount) {
        return res.status(400).json({ success: false, message: 'Project ID and amount are required' });
    }

    try {
        const result = await userProjectManagerService.UpdateInvestmentProject(user_id, project_id, action, amount);
        return res.status(200).json(result);
    } catch (error) {
        console.error('Error buying project:', error);
        res.status(500).json({ success: false, message: 'Failed to buy project' });
    }
};