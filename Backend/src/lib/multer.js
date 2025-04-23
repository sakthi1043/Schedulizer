import multer from 'multer';
import path from 'path';

// Folder path for uploads (relative to the project root)
const uploadFolder = path.resolve('src', 'uploads');

// File filter for allowing only image files
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);  // Accept the file
  } else {
    cb(new Error('Invalid file type. Only JPEG and PNG are allowed.'), false); // Reject the file
  }
};

// Set up storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder); // Specify the folder where files are saved
  },
  filename: (req, file, cb) => {
    // Save files with a unique name based on the current timestamp and original file name
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename); // Set the file name
  },
});

// Multer setup with the storage engine and file filter
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export default upload;
