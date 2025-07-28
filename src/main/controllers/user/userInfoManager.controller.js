import * as userInfoManagerService from '../services/user/userInfoManager.service.js';

export const getUserInfo = async (req, res) => {
    try {
        const user = await userInfoManagerService.getUserInfo();
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const updateUser = async (req, res) => {
    try {
        const {user_id } = req.params;
        const price = req.body;

        const result = await userInfoManagerService.updateUser(id, req.body);

        if (!result) {
            return res.status(404).json({ error: 'Car not found' });
        }

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
