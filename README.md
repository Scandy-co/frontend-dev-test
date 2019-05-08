# frontend-dev-test
Programming test(s) for Scandy frontend developers
https://github.com/Scandy-co/frontend-dev-test/wiki/Dev-test-1


## Getting Started
- Once you have cloned repo, cd into application folder: ```frontend-dev-test/scandy-dev-test```
- Run ```npm i```
- Run ```npm run start```
- Create React App should open up a new browser session pointed to localhost:3000

## Notes
- By default, the email is sent and received by my personal email address: neilgamb@gmail.com
- I was going to set up some env variables to enable reviewer to programmatically change this but did not get to it in time
- Please update this configuration manually on lines 108 and 109 of ```./functions/index.js``` in order to receive the email on your end
- If you would like to change the nodemailer auths, please do so with cli command: ```firebase functions:config:set gmail.email="your@email.com" gmail.password="emailpassword"```

## Usage
- Designed to be as simple and straight forward as possible
- On initial load, the only element on the page is a 'drop zone' onto which you can either drag and drop an image or click to manually upload from local storage
- Once you load an image onto the page, a preview of the image will be rendered below the drop zone as well as an 'upload' button
- When you click the 'upload' button, the application will attempt to upload the image to firebase storage bucket
- If successful, the image will be available for viewing / download via Firebase console.  I have added Cole and George as Editors to the Project so you should be able to access the console.  Please let me know if you cannot.
- Upon successful upload, the application will copy the image, randomly either 'approve' or 'deny' the image, and apply the decision by overlaying "APPROVED" / "DENIED" in green / red text ontop of the copied image
- A download link to the copied "approved" or "denied" image will then be sent to the administrator

## Build Tools / Libraries
- [React](https://reactjs.org/) / [create-react-app cli](https://github.com/facebook/create-react-app)
- [Material UI React Component Library](https://material-ui.com/)
- [react-drop-zone](https://react-dropzone.js.org/)
- [ESLint](https://eslint.org/)
- [Firebase](https://firebase.google.com/)
- [Imagemagick](https://imagemagick.org/index.php)
- [Nodemailer](https://nodemailer.com/about/)

## Approach / Time Management / Takeaways
- All in all, I had a great time working on this.  In all honesty I think it was definitely the most involved and most challenging coding assessment that I have worked on, but I really enjoyed getting back into React, learning a little more about React Hooks and although was challenged by it, really impressed with Firebase so far.
- While I did not officially log my time, I did keep a rough journal of my process and my time management.  In total, it took me roughly 8 total hours including planning & architecture, research, dev env setup, coding, and finally documentation.  The vast majority of this time was obviously spent on researching and learning Firebase and the storage event-triggered cloud functions, most notably the 'sendImage' function that emails a download link to the admin.  
- If I had to do it over again, I would have probably spent a little more time researching / practicing with Firebase cloudfunctions prior to starting on the project and maybe also a little less time on the UI. I tend to get a little carried with perfecting the frontend.
- Overall, I think that this project does a good job of assessing my skillset and I look forward to hearing your feedback!
