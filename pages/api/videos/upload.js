import multer from 'multer';
import nc from 'next-connect';
import fs from 'fs';
import path from 'path';
const User = require('./../../../models/userModel');
const Category = require('./../../../models/categoryModel');
const Video = require('./../../../models/videoModel');
const dbConnect = require('./../../../lib/mongoose');
const authController = require('./../../../controllers/authController');

// const handler = nc({
//   onError: (err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).json({ err: err, errStack: err.stack });
//   },
//   onNoMatch: (req, res) => {
//     res.status(404).json({ err: 'Page is not found' });
//   },
// });

const handler = require('./../../../utils/ncHandler');

export const config = {
  api: {
    bodyParser: false,
  },
};

let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    const dir =
      process.env.NODE_ENV === 'development' ? `${__dirname}` : '/tmp';
    callback(null, dir);
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '_' + Date.now() + '_' + file.originalname);
  },
});

let upload = multer({ storage: storage }).single('file');

handler.use(upload);

import { google } from 'googleapis';

const authenticateGoogle = () => {
  const auth = new google.auth.GoogleAuth({
    keyFilename: path.resolve('./driveToken.json'),
    scopes: 'https://www.googleapis.com/auth/drive',
  });
  return auth;
};

const delteFile = (path) => {
  fs.unlink(path, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
};

const uploadToGoogleDrive = async (file, auth) => {
  const fileMetadata = {
    name: file.originalname,
    parents: ['1boTQtsxeCHDdudRHDF_z-_GA2aqywwcp'],
  };

  const media = {
    mimeType: file.mimetype,
    body: fs.createReadStream(file.path),
  };

  const driveService = google.drive({ version: 'v3', auth });

  const response = await driveService.files.create({
    requestBody: fileMetadata,
    media: media,
  });

  delteFile(file.path);
  return response;
};

handler.post(
  authController.protect,
  authController.restrictTo('admin', 'coach'),
  async (req, res, next) => {
    console.log(req.body.categories);
    const categories = req.body.categories.split(',');
    //Get auth from Google Drive
    let auth = await authenticateGoogle();

    // Upload video to Google Drive and obtain
    //  response of the file uploaded.
    let file_response = await uploadToGoogleDrive(req.file, auth);
    console.log(file_response);

    // Create a new Video based on the req.body parameters
    const newVideo = await Video.create({
      title: req.body.title,
      description: req.body.description,
      gDriveID: file_response.data.id,
      categories: categories,
      uploader: req.user._id,
    });

    res.status(200).send({ status: 'success', data: { newVideo } });
    // res.status(200).json({ status: 'success', message: 'dummy message' });
  }
);

export default handler;
