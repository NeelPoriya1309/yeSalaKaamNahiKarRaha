const handler = require('../../../../utils/ncHandler');
const dbConnect = require('../../../../lib/mongoose');
const catchAsync = require('../../../../utils/catchAsync');
const User = require('../../../../models/userModel');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const AppError = require('./../../../../utils/appError');
const authController = require('./../../../../controllers/authController');

handler.patch(
  catchAsync(async (req, res, next) => {
    await dbConnect();
    const { token } = req.query;

    //1) Get user based on the token
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    //2) If token has not expired, and there is user, set the new password
    if (!user || !token) {
      return next(new AppError('Token is invalid or has expired', 400));
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    //3) Log the user in, send JWT
    authController.createSendToken(user, 200, res);
  })
);

export default handler;
