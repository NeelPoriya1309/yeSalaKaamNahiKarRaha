const handler = require('./../../../utils/ncHandler');
const authController = require('./../../../controllers/authController');
const { serialize } = require('cookie');
const catchAsync = require('./../../../utils/catchAsync');

handler.post(
  authController.protect,
  catchAsync(async (req, res, next) => {
    res.setHeader(
      'Set-Cookie',
      serialize('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
      })
    );
    res.status(200).json({
      status: 'success',
    });
  })
);

export default handler;
