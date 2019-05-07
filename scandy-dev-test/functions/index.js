const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.generateThumbnail = functions.storage.object().onFinalize(async (object) => {
  // ...
  console.log(object)
});
