const handler = require('../../../utils/ncHandler');
const dbConnect = require('../../../lib/mongoose');
const catchAsync = require('../../../utils/catchAsync');
const User = require('../../../models/userModel');
const jwt = require('jsonwebtoken');
const authController = require('./../../../controllers/authController');

handler.post(
  catchAsync(async (req, res, next) => {
    await dbConnect();

    console.log(req.body);
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      role: req.body.role,
    });

    authController.createSendToken(newUser, 201, res);
  })
);

export default handler;
