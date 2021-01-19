const cloudinary = require("cloudinary").v2;
const config = require("config");
cloudinary.config({ 
    cloud_name: config.get("cloudName"), 
    api_key: config.get("cloudKey"), 
    api_secret: config.get("cloudSecret") 
  });
module.exports = {cloudinary};