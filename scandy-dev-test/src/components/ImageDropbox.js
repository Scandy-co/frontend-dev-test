import React, { useCallback, Fragment } from 'react'
import { useDropzone } from 'react-dropzone'
import UploadButton from './UploadButton';
// import RemoveButton from './RemoveButton';
import * as firebase from "firebase/app";
import 'firebase/storage';

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDGgR-Rr4P3FNWVPT8c1Gkk-0nF9XleAOw",
    authDomain: "scandy-dev-test.firebaseapp.com",
    databaseURL: "https://scandy-dev-test.firebaseio.com",
    projectId: "scandy-dev-test",
    storageBucket: "scandy-dev-test.appspot.com",
    messagingSenderId: "857560367946",
    appId: "1:857560367946:web:7a251a24d8670c7d"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default function MyDropzone() {

  const onDrop = useCallback(acceptedFiles => {
    loadImage(acceptedFiles)
  }, [])

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({onDrop})

  const loadImage = function(acceptedFiles) {

    let input, file, fr, img;
    
    const createImage = function(){
      img = new Image();
      img.onload = imageLoaded;
      img.src = fr.result;
    }

    const imageLoaded = function(){
      let canvas = document.getElementById("canvas")
      canvas.width = img.width;
      canvas.height = img.height;
      let ctx = canvas.getContext("2d");
      ctx.drawImage(img,0,0);
    }

    input = document.getElementById('imgfile');
    file = input.files[0] || acceptedFiles[0];
    fr = new FileReader();
    fr.onload = createImage;
    fr.readAsDataURL(file);
  }

  const dropboxStyles = {
    border: '1px dashed #ccc',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  }

  const canvasStyles = {
    maxWidth: '100%',
  }

  // const handleRemove = function(e) {
  //   e.stopPropagation();
  //   document.getElementById("imgfile").value = null;
  // }

  const handleUpload = function(e) {
    console.log(acceptedFiles[0])

    // Create a root reference
    var storageRef = firebase.storage().ref();

    // Create a reference to 'upload.jpg'
    var uploadRef = storageRef.child('upload.jpg');

    // Create a reference to 'images/upload.jpg'
    var uploadImageRef = storageRef.child('images/upload.jpg');

    // While the file names are the same, the references point to different files
    // uploadRef.name === uploadImageRef.name            // true
    // uploadRef.fullPath === uploadImageRef.fullPath    // false

    var file = acceptedFiles[0]
    uploadRef.put(file).then(function(snapshot) {
      console.log('Uploaded a blob or file!');
    });


  }

  const showDropBox = acceptedFiles.length === 0

  return (
    <Fragment>
    <div style={dropboxStyles} {...getRootProps()}>
      <form id="dropboxForm">
        <input id="imgfile" {...getInputProps()} />
        {
          showDropBox && 
          (isDragActive ?
            <p>Drop your file here ...</p> :
            <p>Drag 'n' drop your file here, or click to select file</p>
          )
        }
        {
          !showDropBox &&
          <Fragment>
            <canvas id="canvas" style={canvasStyles}></canvas>
            {/* <RemoveButton handleClick={handleRemove} /> */}
          </Fragment>
        }
      </form>
    </div>
      {
        !showDropBox && <UploadButton handleClick={()=>handleUpload(acceptedFiles)}/>
      }
    </Fragment>
  )
}