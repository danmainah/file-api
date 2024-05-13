const express = require("express");
const fs = require("fs")
const path = require("path");
const multer = require("multer");

const app = express();

let port = process.env.PORT;

if (port == null || port == "") {
port = 3000;
}

app.listen(port, ()=>{
console.log('App listening...')
})

// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get("/", (req, res) => {
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
});

// Multer Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage });

// Code to upload multiple images/videos
app.post('/', upload.array('files'), (req, res) => {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }
    const filenames = req.files.map(file => file.filename);
    res.json({ message: 'Files uploaded successfully', filenames: filenames });
});
