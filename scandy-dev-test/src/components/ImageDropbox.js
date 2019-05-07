import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

export default function MyDropzone() {

  const onDrop = useCallback(acceptedFiles => {
    loadImage(acceptedFiles)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop})

  const loadImage = function(acceptedFiles) {

    let input, file, fr, img;
    
    const write = function(msg) {
      let p = document.createElement('p');
      p.innerHTML = msg;
      document.body.appendChild(p);
    }

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
      // alert(canvas.toDataURL("image/png"));
    }

    if (typeof window.FileReader !== 'function') {
      write("The file API isn't supported on this browser yet.");
      return;
    }

    input = document.getElementById('imgfile');
    debugger
    file = input.files[0] || acceptedFiles[0];
    fr = new FileReader();
    fr.onload = createImage;
    fr.readAsDataURL(file);
    
  }

  return (
    <div {...getRootProps()}>
      <input id="imgfile" {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
      <canvas id="canvas"></canvas>
    </div>
  )
}