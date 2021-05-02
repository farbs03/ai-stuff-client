import React, {useState} from 'react'

import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FolderIcon from '@material-ui/icons/Folder';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import {Box, Typography, Fab, IconButton, Container, Dialog, Card, CardActionArea, Button, LinearProgress} from "@material-ui/core"
import ImageIcon from '@material-ui/icons/Image';
import NotesIcon from '@material-ui/icons/Notes';
import AddIcon from '@material-ui/icons/Add'
import axios from "axios";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

const ImageToText = () => {
    const classes = useStyles();
    const [value, setValue] = useState("image");

    const [mainState, setMainState] = useState("initial")
    const [imageUploaded, setImageUploaded] = useState(0)
    const [selectedFile, setSelectedFile] = useState(null)
    const [encoding, setEncoding] = useState("")
    const [loading, setLoading] = useState(false)
    const [textFromImage, setTextFromImage] = useState("")

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleUploadClick = (event) => {
        var file = event.target.files[0];
        setSelectedFile(event.target.files[0])
        
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setSelectedFile([reader.result])
            setImageUploaded(reader.result)
            setEncoding(reader.result.split("base64,")[1])
        }
        setMainState("uploaded")
    }

    const imageResetHandler = () => {
        setMainState("initial");
        setSelectedFile(null);
        setImageUploaded(0);
        setTextFromImage("")
        setLoading(false)
    }

    const uploadImage = () => {
        setLoading(true);
        axios.post('https://incentiva-cloud-vision.herokuapp.com/', {
            imageString: encoding
        })
        .then(res => {
            setTimeout(() => setLoading(false), 200)
            setTextFromImage(res.data);
            setValue("output");
        })
    }
    return (
        <div>
            <Box style={{width: "500px", margin: "10px auto", border: "1px #ccc solid", padding: "10px"}}>
                {value === "image" ? 
                    (
                        <>
                            <input
                            accept="image/*"
                            style={{display: "none"}}
                            id="contained-button-file"
                            type="file"
                            onChange={handleUploadClick}
                            />
                            <label htmlFor="contained-button-file">
                                <div style={{width: "50%", margin: "10px auto", textAlign: "center"}}>
                                    <Fab color="primary" component="span" aria-label="add" style={{margin: "10px auto", color: "white"}}>
                                        <AddIcon />
                                    </Fab>
                                </div>
                            </label>
                            {selectedFile !== null ?
                                (
                                    <Card elevation={4} style={{padding: "5px", marginBottom: "10px"}}>
                                        <div style={{padding: "5px"}}>
                                            <IconButton onClick={imageResetHandler} color="primary" style={{width: "50px"}}>
                                            <CloseIcon />
                                            </IconButton>
                                        </div>
                                        <CardActionArea style={{textAlign: "center"}}>
                                            <img
                                            width="100%"
                                            src={selectedFile}
                                            alt="Upload"
                                            />
                                        </CardActionArea>
                                        <div style={{width: "100px", marginLeft: "auto", marginRight: "auto", marginTop: "5px", marginBottom:"10px"}}>
                                            <Button variant="contained" color="primary" style={{width: "100px", color:"white", textTransform: "none"}} onClick={uploadImage}>Upload</Button>
                                        </div>
                                        {loading ? 
                                            (
                                                <LinearProgress variant="indeterminate" style={{margin: "10px auto", width: "200px"}}/>
                                            )
                                            :
                                                <></>
                                        }
                                    </Card>
                                )
                                :
                                    <Typography variant="h5" style={{textAlign: "center"}}>Upload an image with some text in it!</Typography>
                            }
                        </>
                    )
                    :
                        <>
                            <Typography variant="h5" style={{textAlign: "center", fontWeight: "bold"}}>Output</Typography>
                            {textFromImage ? (<Typography>{textFromImage}</Typography>) : <Typography variant="h5" style={{textAlign: "center"}}>Upload an image with some text in it!</Typography>}
                            
                        </>
                }
                    
            </Box>
            <BottomNavigation value={value} onChange={handleChange} className={classes.root} showLabels style={{margin: "10px auto"}}>
                <BottomNavigationAction label="Upload Image" value="image" icon={<ImageIcon />} />
                <BottomNavigationAction label="Output" value="output" icon={<NotesIcon />} />
            </BottomNavigation>
        </div>
    )
}

export default ImageToText;
