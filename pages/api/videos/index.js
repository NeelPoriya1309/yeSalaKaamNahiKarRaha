const handler = require('../../../utils/ncHandler');
const catchAsync = require('../../../utils/catchAsync');
const Video = require('../../../models/videoModel');
const authController = require('./../../../controllers/authController');

handler.get(
  authController.protect,
  catchAsync(async (req, res, next) => {
    const videos = await Video.find({})
      .populate('categories')
      .populate('uploader');

    res.status(200).json({
      status: 'success',
      results: videos.length,
      data: {
        videos,
      },
    });
  })
);

handler.delete(
  authController.protect,
  authController.restrictTo('admin', 'coach'),
  catchAsync(async (req, res, next) => {
    res.status(200).json({ status: 'success', message: 'vidoe deleted' });
  })
);

export default handler;
