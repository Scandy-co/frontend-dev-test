import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

const ImageDropbox = (props) => {

  const loadImage = image =>  props.loadImage(image);

  const onDrop = useCallback(acceptedFiles => loadImage(acceptedFiles[0]), []) // eslint-disable-line

  const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop})

  const dropboxStyles = {
    border: '1px dashed #ccc',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  }

  return (
    <div style={dropboxStyles} {...getRootProps()}>
      <input id="imgfile" {...getInputProps()} />
      {isDragActive ?
        <p>Drop your file here ...</p> :
        <p>Drag 'n' drop your file here, or click to select file</p>
      }
    </div>
  )
} 

export default ImageDropbox;