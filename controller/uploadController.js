const fs = require("fs")
const path = require("path");
const multer = require("multer");

exports.getPosts = async (req, res) => {
     // Check if the "uploads" directory exists
     if(fs.existsSync("uploads")){
        fs.readdir("uploads", (err, files) => {
            if (err) {
                console.log(err);
                res.send("error");
            } else {
                // Generate HTML to display each file in the "uploads" directory
                let fileLinks = files.map(file => `<a href="/uploads/${file}">${file}</a>`).join('<br>');
                res.send(fileLinks);
            }
        });
    }
    else{
        fs.mkdir("uploads", (err) => {
            if (err) {
                console.log(err);
                res.send("error");
            } else {
                res.send("There are no files in uploads");
            }
        });
    }   
  };
  
  // Multer Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
});

// Code to upload multiple images/videos
  exports.createPost = async (req , res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: 'No files uploaded' });
      }
      const filenames = req.files.map(file => file.filename);
      res.json({ message: 'Files uploaded successfully', filenames: filenames });
  };
  