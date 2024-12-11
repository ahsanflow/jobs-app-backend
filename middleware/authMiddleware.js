const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Not authorized, no token' });
        }

        // Verify token
        const decoded = jwt.verify(token, 'your_secret_key');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Not authorized, invalid token' });
    }
};

module.exports = { protect };
