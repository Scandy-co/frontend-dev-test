import React, { useCallback, Fragment } from 'react'
import { useDropzone } from 'react-dropzone'
import RemoveButton from './RemoveButton';

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

  const handleRemove = function(e) {
    e.stopPropagation();
    document.getElementById("imgfile").value = null;
  }

  const showDropBox = acceptedFiles.length === 0
  console.log(showDropBox)

  return (
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
            <RemoveButton handleClick={handleRemove} />
          </Fragment>
        }
      </form>
    </div>
  )
}