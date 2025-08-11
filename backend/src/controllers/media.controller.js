const multer = require('multer');
const path = require('path');
const fs = require('fs');
const upload = multer({ dest: 'uploads/' });
const DRY = process.env.DRY_RUN === 'true';

exports.uploadMedia = (req, res) => {
  upload.single('image')(req, res, async (err) => {
    if (err) return res.status(500).json({ error: 'upload error' });
    if (!req.file) return res.status(400).json({ error: 'no file' });
    // in dry-run we return a fake media URN and local URL
    const localUrl = `/uploads/${req.file.filename}`;
    const mediaUrn = DRY ? `urn:li:digitalmediaAsset:dry-${req.file.filename}` : null;
    res.json({ ok: true, url: localUrl, mediaUrn });
  });
};
