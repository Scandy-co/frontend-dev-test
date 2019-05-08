import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import UploadButton from './UploadButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import SuccessMessage from './SuccessMessage';
import ImageDropbox from './ImageDropbox';
import * as firebase from "firebase/app";

class ImageDropContainer extends Component {

  state = {
    imageFile: null,
    progress: null,
    imported: false,
    uploading: false,
    uploaded: false,
    displayDropbox: true
  }

  handleProgress = (progress) => {
    this.setState({ uploadProgress: progress })
  }

  handleImageLoad = () => {
    const { imageFile } = this.state;
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
    file = input.files[0] || imageFile;
    fr = new FileReader();
    fr.onload = createImage;
    fr.readAsDataURL(file);
  }

  handleImageUpdate = (image) => {
    image && this.setState({ imageFile: image, imported: true })
    this.handleImageLoad()
  }

  handleRemove = () => {
    console.log('remove image')
  }

  handleUpload = () => {
    let storageRef = firebase.storage().ref();
    let uploadRef = storageRef.child('upload.jpg');
    // let uploadImageRef = storageRef.child('images/upload.jpg');
    let file = this.state.imageFile;

    let uploadTask = uploadRef.put(file);
    uploadTask.on('state_changed', snapshot => {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      this.setState({ progress: progress, uploading: true })
    }, function(error) {
      // Handle unsuccessful uploads
      console.log('There was an error during upload!', error)
    }, () => {
      // Handle successful uploads on complete
      this.setState({ uploaded: true, uploading: false })
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        console.log('File available at', downloadURL);
      });
    });
  }

  render() {
    const { progress, imported, uploaded, uploading } = this.state;
    const { classes } = this.props;

    return (
      <Paper className={classes.root} elevation={0}>
        <div className={classes.wrapper}>
          { !uploaded && <ImageDropbox loadImage={(image) => this.handleImageUpdate(image)} /> }
          { imported && <canvas id="canvas" className={classes.canvasStyles}></canvas> }
          { uploading && progress < 100 && (
            <div className={classes.progressContainer}>
              <CircularProgress className={classes.progress} />
            </div>
          )}
          { imported && !uploading && !uploaded && <UploadButton handleClick={() => this.handleUpload()}/> }
          <SuccessMessage open={uploaded} />
        </div>
      </Paper>
    )
  }
}

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  wrapper: {
    maxWidth: 1500,
    margin: '0 auto'
  },
  progress: {
    display: 'block',
    margin: theme.spacing.unit * 2,
  },
  canvasStyles: {
    maxWidth: '100%',
    marginTop: 20,
  },
  progressContainer: {
    display: 'flex',
    justifyContent: 'center'
  }
});

ImageDropContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageDropContainer);