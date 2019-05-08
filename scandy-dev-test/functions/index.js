const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp()
const spawn = require('child-process-promise').spawn;
const path = require('path');
const os = require('os');
const fs = require('fs');

exports.checkImage = functions.storage.object().onFinalize(async (object) => {
  const fileBucket = object.bucket; // The Storage bucket that contains the file.
  const filePath = object.name; // File path in the bucket.
  const contentType = object.contentType; // File content type.

  // Exit if this is triggered on a file that is not an image.
  if (!contentType.startsWith('image/')) {
    return console.log('This is not an image.');
  }

  // Get the file name.
  const fileName = path.basename(filePath);
  // Exit if the image is already checked.
  if (fileName.startsWith('checked_')) {
    return console.log('Already checked.');
  }

  // Download file from bucket.
  const bucket = admin.storage().bucket(fileBucket);
  const tempFilePath = path.join(os.tmpdir(), fileName);
  const metadata = {
    contentType: contentType,
  };
  await bucket.file(filePath).download({destination: tempFilePath});
  console.log('Image downloaded locally to', tempFilePath);

  let success = Math.random() * 100 > 50
  let color = success ? 'green' : 'red'
  let message = success ? 'APPROVED!' : 'DENIED!'

  await spawn('convert', [tempFilePath, 
    '-fill', color,
    '-stroke', 'white',
    '-font', 'Arial-Bold',
    '-pointsize', '100',
    '-gravity', 'center',
    '-annotate','0', message,
    tempFilePath]);

  console.log('Checked image created at', tempFilePath);
  // We add a 'checked_' prefix to checked image file name. That's where we'll upload the checked image.
  const checkedFileName = `checked_${fileName}`;
  const checkedFilePath = path.join(path.dirname(filePath), checkedFileName);
  // Uploading the checked image.
  await bucket.upload(tempFilePath, {
    destination: checkedFilePath,
    metadata: metadata,
  });
  // Once the checked image has been uploaded delete the local file to free up disk space.
  return fs.unlinkSync(tempFilePath);
});