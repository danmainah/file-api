const fs = require("fs")
const jwt = require('jsonwebtoken');

exports.getPosts = async (req, res) => {
     // Check if the "uploads" directory exists
     const token = req.headers.authorization.split(' ')[1]
     const payload = jwt.decode(token);
     const username = payload.user.username
     if(fs.existsSync(`uploads/${username}`)){
        fs.readdir(`uploads/${username}`, (err, files) => {
            if (err) {
                console.log(err);
                res.send("error");
            } else {
                // Generate HTML to display each file in the "uploads" directory
                let fileLinks = files.map(file => `<a href="/uploads/${username}/${file}">${file}</a>`).join('<br>');
                res.send(fileLinks);
            }
        });
    }
    else{
        fs.mkdir(`uploads/${username}`, (err) => {
            if (err) {
                console.log("err");
                res.send("error");
            } else {
                res.send("There are no files in uploads");
            }
        });
    }   
  };

// Code to upload multiple images/videos
  exports.createPost = async (req , res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: 'No files uploaded' });
      }
      const filenames = req.files.map(file => file.filename);
      res.json({ message: 'Files uploaded successfully', filenames: filenames });
  };
