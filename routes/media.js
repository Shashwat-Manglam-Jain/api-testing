const express = require('express');
const mediaController = require('../controllers/mediaController');
const multer = require('multer');
const fs = require('fs');
const path = require('path'); // Add the missing 'path' module

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync('public')) {
      fs.mkdirSync('public');
    }
    if (!fs.existsSync('public/videos')) {
      fs.mkdirSync('public/videos');
    }
    cb(null, 'public');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    var ext = path.extname(file.originalname);
    if (ext !== '.mkv' && ext !== '.mp4') {
      return cb(new Error('Only Videos are allowed'));
    }
    cb(null, true);
  },
});

const router = express.Router();

router.get('/all', mediaController.getAll);

// Corrected the parameter passed to `upload.fields`. It should be an array of objects with 'name' property.
router.post('/create', upload.fields([{ name: 'videoes', maxCount: 50 }]), mediaController.create);

module.exports = router;
