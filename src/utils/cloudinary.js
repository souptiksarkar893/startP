const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // File uploaded successfully
    //console.log("File is uploaded on Cloudinary:", response.url);
    fs.unlinkSync(localFilePath)
    return response;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);

    // Remove the locally saved file
    try {
      fs.unlinkSync(localFilePath);
    } catch (unlinkError) {
      console.error("Error deleting local file:", unlinkError);
    }
    
    return null;
  }
};

module.exports = uploadCloudinary;
