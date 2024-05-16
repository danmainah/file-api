const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require("path");
const app = express();
const uploadController = require('../controller/uploadController');

// Multer Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
});
// Serve static files from the "uploads" directory
const upload = multer({ storage });

router.post('/', upload.array('files'), uploadController.createPost);
router.get('/', uploadController.getPosts);

module.exports = router