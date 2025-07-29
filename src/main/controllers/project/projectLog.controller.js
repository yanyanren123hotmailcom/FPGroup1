import * as projectLogService from '../../services/project/projectLog.service.js';

/**
 * Get logs for a specific project
 */
export const getLogByProjectId = async (req, res) => {
    const { project_id } = req.params;
    try {
        const logs = await projectLogService.getLogByProjectId(project_id);
        res.json(logs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Add a new project log
 */
export const addLog = async (req, res) => {
    const { project_id, rate, price, date } = req.body;
    try {
        await projectLogService.addLog({ project_id, rate, price, date });
        res.status(201).json({});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Delete logs between two dates
 */
export const deleteLogsBetweenDates = async (req, res) => {
    const { begin, e } = req.body;
    try {
        await projectLogService.deleteLogsBetweenDates(begin, e);
        res.status(200).json({});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
