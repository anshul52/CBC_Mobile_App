import { executeQuery2 } from '../config/db.js';

export const getUser = async (req, res) => {
    const { phone } = req.body; 
    try {
        const [result] = await executeQuery2('SELECT * FROM users WHERE phone = ?', [phone]);
        res.status(200).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user' });
    }
}; 