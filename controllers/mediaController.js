const Media = require('../models/Media');

exports.getAll = async (req, res) => {
  try {
    const media = await Media.find();
    res.json(media);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const videosPath = [];

    // Assuming 'videoes' is the fieldname used in Multer middleware
    if (req.files && req.files.videoes) {
      const files = req.files.videoes;
      files.forEach((file) => {
        // Assuming 'path' is the path property of the file object set by Multer storage
        videosPath.push(file.path);
      });
    }

    // Create a new media document in MongoDB
    const newMedia = new Media({
      name,
      video: videosPath,
    });

    // Save the new media document to the database
    const savedMedia = await newMedia.save();

    res.status(201).json(savedMedia);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
