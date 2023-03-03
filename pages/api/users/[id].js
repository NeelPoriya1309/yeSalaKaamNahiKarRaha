const handler = require('./../../../utils/ncHandler');
const authController = require('./../../../controllers/authController');
const catchAsync = require('./../../../utils/catchAsync');
const User = require('./../../../models/userModel');

handler.get(
  authController.protect,
  catchAsync(async (req, res, next) => {
    const { id } = req.query;

    const user = await User.findById(id);
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  })
);

export default handler;
