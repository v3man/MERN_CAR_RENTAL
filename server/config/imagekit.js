const ImageKit = require("imagekit");

let imagekit = null;

if (
  process.env.IMAGEKIT_PUBLIC_KEY &&
  process.env.IMAGEKIT_PRIVATE_KEY &&
  process.env.IMAGEKIT_URL_ENDPOINT &&
  process.env.IMAGEKIT_PUBLIC_KEY !== "your_imagekit_public_key"
) {
  imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  });
} else {
  console.warn("⚠️  ImageKit credentials not configured. Image upload will be disabled.");
}

module.exports = imagekit;
