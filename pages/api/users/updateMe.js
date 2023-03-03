const handler = require('../../../utils/ncHandler');
const dbConnect = require('../../../lib/mongoose');
const User = require('../../../models/userModel');
const authController = require('../../../controllers/authController');
const AppError = require('../../../utils/appError');
const catchAsync = require('../../../utils/catchAsync');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

handler.patch(
  authController.protect,
  catchAsync(async (req, res, next) => {
    //1) Getting the token and check if it exists
    if (req.body.password || req.body.passwordConfirm) {
      return next(
        new AppError(
          'This route is not for password updates. Please use /updatePassword.',
          400
        )
      );
    }

    //2) Update user document
    const filteredBody = filterObj(req.body, 'name', 'email');
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      filteredBody,
      {
        new: true,
        runValidators: true,
      }
    );

    //3) Send response
    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    });
  })
);

export default handler;
