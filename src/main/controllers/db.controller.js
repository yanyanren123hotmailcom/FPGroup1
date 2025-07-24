import * as dbService from '../services/db.service.js';

export const initDB = async (req, res) => {
    try {
        const result = await dbService.initializeDB();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const seedData = async (req, res) => {
    try {
        const result = await dbService.seedData();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
