const express = require("express");
const cors = require('cors')
const passport = require('passport');
const bodyParser = require('body-parser');
const app = express();

require('./auth/auth');

const routes = require('./routes/user');
const uploads = require('./routes/uploads');

app.use(bodyParser.json())
app.use(passport.initialize());
app.use(cors())

let port = process.env.PORT;

if (port == null || port == "") {
port = 3000;
}

app.listen(port, ()=>{
console.log('App listening...')
})

// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use('/user', routes);
app.use('/uploads',passport.authenticate('jwt', { session: false }), uploads);

// app.use(function(err, req, res, next) {
//   console.error(err.stack); // Log error stack trace
//   res.status(err.status || 500);
//   res.json({ error: "error occurred when access the page" });
// });

// // Serve static files from the "uploads" directory
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.get("/", (req, res) => {
//     // Check if the "uploads" directory exists
//     if(fs.existsSync("uploads")){
//         fs.readdir("uploads", (err, files) => {
//             if (err) {
//                 console.log(err);
//                 res.send("error");
//             } else {
//                 // Generate HTML to display each file in the "uploads" directory
//                 let fileLinks = files.map(file => `<a href="/uploads/${file}">${file}</a>`).join('<br>');
//                 res.send(fileLinks);
//             }
//         });
//     }
//     else{
//         fs.mkdir("uploads", (err) => {
//             if (err) {
//                 console.log(err);
//                 res.send("error");
//             } else {
//                 res.send("There are no files in uploads");
//             }
//         });
//     }   
// });

// // Multer Configuration
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//       cb(null, Date.now() + '-' + file.originalname);
//     },
// });

// const upload = multer({ storage });

// // Code to upload multiple images/videos
// app.post('/', upload.array('files'), (req, res) => {
//     if (!req.files || req.files.length === 0) {
//       return res.status(400).json({ error: 'No files uploaded' });
//     }
//     const filenames = req.files.map(file => file.filename);
//     res.json({ message: 'Files uploaded successfully', filenames: filenames });
// });
