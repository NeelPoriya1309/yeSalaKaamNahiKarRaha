const handler = require('../../../utils/ncHandler');
const dbConnect = require('../../../lib/mongoose');
const catchAsync = require('../../../utils/catchAsync');
const User = require('../../../models/userModel');
const jwt = require('jsonwebtoken');

handler.get(
  catchAsync(async (req, res, next) => {
    await dbConnect();
    const users = await User.find({});

    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users,
      },
    });
  })
);

export default handler;
