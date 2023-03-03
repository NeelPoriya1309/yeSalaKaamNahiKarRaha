const handler = require('../../../utils/ncHandler');
const dbConnect = require('../../../lib/mongoose');
const catchAsync = require('../../../utils/catchAsync');
const User = require('../../../models/userModel');
const authController = require('./../../../controllers/authController');
const AppError = require('./../../../utils/appError');

handler.post(
  catchAsync(async (req, res, next) => {
    await dbConnect();

    const { email, password } = req.body;

    //1) Check if email and password exist
    if (!email || !password) {
      return next(new AppError('Please provide email and password!', 400));
    }

    //2) Check if the email is valid or not
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError('Incorrect email or password!', 401));
    }

    //3) If everything is okay, send the token
    authController.createSendToken(user, 200, res);
  })
);

export default handler;
