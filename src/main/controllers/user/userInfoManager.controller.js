import * as userInfoManagerService from '../../services/user/userInfoManager.service.js';

export const getUserInfo = async (req, res) => {
    try {
        const {user_id}=req.params;
        const user = await userInfoManagerService.getUserInfo(user_id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const updateUser = async (req, res) => {
    try {
        const {user_id } = req.params;
        const {current_funds,current_earnings} = req.body;
        console.log("controllers output: current_funds,current_earnings:   ",current_funds,current_earnings);

        const result = await userInfoManagerService.updateUser(user_id, current_funds,current_earnings);

        if (!result) {
            return res.status(404).json({ error: 'Car not found' });
        }

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
