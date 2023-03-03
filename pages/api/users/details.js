const catchAsync = require('../../../utils/catchAsync');
const handler = require('../../../utils/ncHandler');
const authController = require('./../../../controllers/authController');

handler.get(
  authController.protect,
  catchAsync(async (req, res, next) => {
    res.status(200).json({
      status: 'success',
      data: {
        user: req.user,
      },
    });
  })
);

export default handler;
