const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require("path");
const app = express();
const uploadController = require('../controller/uploadController');
const fs = require("fs")
const jwt = require('jsonwebtoken');

// Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const token = req.headers.authorization.split(' ')[1]
    const payload = jwt.decode(token);
    const username = payload.user.username
    const dir = `uploads/${username}`;

    // Create directory if it doesn't exist
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
    }

    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Serve static files from the "uploads" directory
router.post('/:username', upload.array('files'), uploadController.createPost);
router.get('/:username', uploadController.getPosts);

module.exports = router