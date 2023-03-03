const handler = require('../../../utils/ncHandler');
const authController = require('./../../../controllers/authController');

handler.post(authController.protect, authController.forgotPassword);

export default handler;
