const express = require('express');
const router = express.Router();
const multer = require('multer');
const xmlData = require('../models/xmlData');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

router.post('/upload', upload.single('xml'), (req, res) => {
  const xmlFile = req.file.path;

  const newXMLData = new xmlData({ data: xmlFile });
  newXMLData.save()
    .then(() => res.json({ message: 'XML armazenado com sucesso' }))
    .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;
