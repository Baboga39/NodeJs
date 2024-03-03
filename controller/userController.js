// controllers/userController.js
const userService = require('../services/UserService').userService;

const getUserInfo = async (req, res) => {
    res.send('User Info');
};

module.exports = {
  getUserInfo,
}