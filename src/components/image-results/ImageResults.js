import React, {Component} from 'react';
import propTypes from 'prop-types'
import GridList from "@material-ui/core/GridList";
import IconButton from "@material-ui/core/IconButton";
import {Cancel, ZoomIn} from "@material-ui/icons";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import GridListTile from "@material-ui/core/GridListTile";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

class ImageResults extends Component {
    state = {
        open: false,
        currentImage: {},
        currentImagesrc: '',
        currentImageURL: '',
        currentImageTitle: '',
        commonDownloadURL: 'https://pixabay.com/images/download/'
    }

    generateDownloadLink = () =>{
        const tagList = this.state.currentImage.tags.split(", ");
        const downloadLink = `${this.state.commonDownloadURL}${tagList[0]}-${this.state.currentImage.id}_1920.jpg?attachment`
        window.open(downloadLink, '_blank')
    }

    handleOpen = img => {
        const currentImage = img
        const currentImagesrc = img.largeImageURL
        //console.log(img)
        this.setState({
            currentImage,
            currentImagesrc,
            open: true
        });

    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        let imageListContent;
        const {images} = this.props;

        if (images) {
            imageListContent = (
                <GridList cols={3}>
                    {images.map(img => (
                        <GridListTile key={img.id}>
                            <img src={img.largeImageURL} alt={img.tags}/>
                            <GridListTileBar
                                title={img.tags}
                                subtitle={<span>By: {img.user}</span>}
                                actionIcon={
                                    <IconButton onClick={() => this.handleOpen(img)}>
                                        <ZoomIn style={{color: "white"}}/>
                                    </IconButton>
                                }
                            />
                        </GridListTile>
                    ))}
                </GridList>
            );
        } else {
            imageListContent = null;
        }
        return (
            <div className='mt-4'>
                {imageListContent}
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogContent style={{margin: 0, padding: 0}}>
                        <img src={this.state.currentImagesrc} alt={this.state.currentImageTitle} style={{width: '100%'}}/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="secondary" startIcon={<CloudDownloadIcon/>} onClick={this.generateDownloadLink}>Download</Button>
                        <Button variant="contained" color="secondary" startIcon={<Cancel/>} onClick={this.handleClose}>Close</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

ImageResults.propTypes = {
    images: propTypes.array.isRequired
}

export default ImageResults;
