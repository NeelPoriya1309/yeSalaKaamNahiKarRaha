const handler = require('../../../utils/ncHandler');
const authController = require('../../../controllers/authController');
const catchAsync = require('../../../utils/catchAsync');
const User = require('../../../models/userModel');

handler.delete(
  authController.protect,
  catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false });

    res.status(204).json({
      status: 'success',
      data: null,
    });
  })
);

export default handler;
