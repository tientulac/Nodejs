const cloudinary = require('cloudinary');
cloudinary.config({ 
    cloud_name: 'tientulac', 
    api_key: '679878345865564', 
    api_secret: 'JB750tkOve13NxDM2j2XL3qQhAE' 
});
cloudinary.v2.uploader.upload("imagecv.jpg",
  { public_id: "tiennnporfolio" }, 
  function(error, result) {console.log(result); });