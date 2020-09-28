const router = require('express').Router();
const multer = require('multer');
const path = require('path');
// const fileupload = require("express-fileupload");
// const bodyParser = require('body-parser')
// const morgan = require('morgan');

const Practice = require('../models/practice.model');
const Teacher = require('../models/teacher.model');

router.route('/').get((req, res) => {
  Teacher.find()
    .populate({ path: 'practices', select: 'name' })
    .then(teachers => res.json(teachers))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/create').post((req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const address = req.body.address;
  const newTeacher = new Teacher({ name, description, address });

  newTeacher.save()
    .then(() => res.json('Teacher created!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/edit/:id').post((req, res) => {

  Teacher.findById(req.params.id)
    .then(teacher => {
      teacher.name = req.body.name;
      teacher.description = req.body.description;
      teacher.address = req.body.address;

      teacher.save()
        .then(() => res.json('Teacher updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Teacher.findByIdAndDelete(req.params.id)
    .then(() =>
      Practice.deleteMany({ "teacher": req.params.id })
        .then(() => res.json('Teacher and practices deleted.'))
        .catch(err => res.status(400).json('Error: ' + err))
    )
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Teacher.findById(req.params.id)
    .then(teacher => res.json(teacher))
    .catch(err => res.status(400).json('Error: ' + err));
});



// const storage = multer.diskStorage({
//   destination: '/public/uploads/',
//   // By default, multer removes file extensions so let's add them back
//   filename: function (req, file, cb) {
//     console.log(file);
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   }
// });

// const imageFilter = function (req, file, cb) {
//   // Accept images only
//   if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
//     req.fileValidationError = 'Only image files are allowed!';
//     return cb(new Error('Only image files are allowed!'), false);
//   }
//   cb(null, true);
// };

// const upload = multer({
//   storage: storage
//   // fileFilter: imageFilter
// }).array("avatar", 1);


// router.route('/uploadImage').post((req, res) => {

//   upload(req, res, (err) => {
//     // console.log(req, res);
//     // if (req.fileValidationError) {
//     //   return res.send(req.fileValidationError);
//     // }
//     // else if (!req.files) {
//     //   return res.send('Please select an image to upload');
//     // }
//     // else if (err instanceof multer.MulterError) {
//     //   return res.send(err);
//     // }
//     // else if (err) {
//     //   return res.send(err);
//     // }


//     if (err) {
//       res.send(err);
//       console.log("error:", err);
//     } else {
//       console.log("success");
//       res.send(`Image uploaded successfully`);
//     }
//   });
// });


module.exports = router;
