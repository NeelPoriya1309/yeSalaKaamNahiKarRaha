const handler = require('./../../../utils/ncHandler');
const authController = require('./../../../controllers/authController');

handler.patch(authController.protect, authController.updatePassword);

export default handler;
