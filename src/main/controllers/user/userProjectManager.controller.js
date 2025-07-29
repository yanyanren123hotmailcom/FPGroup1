import express from 'express';
import * as userProjectManagerService from '../../services/user/userProjectManager.service.js';

const router = express.Router();

// 根据 user_id 查询拥有的项目
export const getUserProjectList= async (req, res) => {
    const { user_id } = req.params;

    try {
        const projects = await userProjectManagerService.getProjectsByUserId(user_id);
        res.status(200).json({ success: true, data: projects });
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch projects' });
    }
};
