import React, {useState, useEffect} from "react"
import {AppBar, Grid, Link, IconButton } from "@material-ui/core"
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import {NavLink} from 'react-router-dom'

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import {motion} from "framer-motion"

import useStyles from "./Styles"
import { red, pink, orange, deepOrange, yellow, green, teal, cyan, blue, purple, deepPurple, indigo } from '@material-ui/core/colors';
import Logo from "./aistuff.png"
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Hidden from '@material-ui/core/Hidden';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from "@material-ui/icons/Close"
import { ThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SettingsIcon from "@material-ui/icons/Settings"
import { TwitterPicker } from 'react-color';

import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const titleVariants = {
    hover: {
      scale: 1.05,
  
      transition: {
        duration: 0.5,
        yoyo: Infinity
      }
    }
};

function HideOnScroll(props) {
    const { children, window } = props;

    const trigger = useScrollTrigger({ target: window ? window() : undefined });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}


const colors = [pink[300], red[400], deepOrange[300], orange[400], "#ffca28", "#00D084", teal[300], cyan[400], blue[400], purple[300], "#805AD5", indigo[400]];

const Navbar = (props) => {
    const classes = useStyles();

    var path = window.location.pathname
    
    const [currentPath, setCurrentPath] = useState(path)

    const [mobileOpen, setMobileOpen] = useState(false);
    const mobile = useMediaQuery('(max-width:750px)');

    const handleDrawerToggle = () => {
        if(mobile) {
            setMobileOpen(!mobileOpen);
        }
    };

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
  
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
  
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };
  
    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }
  
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);
    
    const [darkState, setDarkState] = useState(false);
    const palletType = darkState ? "dark" : "light";
    const [primaryColor, setPrimaryColor] = useState(blue[400])
    const primaryText = darkState ? "#fff": "rgba(0, 0, 0, 0.87)"

    const theme = createMuiTheme({
        palette: {
            type: palletType,
            primary: {
                main: primaryColor
            },
        },
    });

    const [settingsOpen, setSettingsOpen] = useState(false);

    const handleSettingsOpen = () => {
        setSettingsOpen(true);
    };

    const handleSettingsClose = ({newColor}) => {
        setSettingsOpen(false);
        console.log(newColor)
    };

    const toggleChecked = () => {
        setDarkState((prev) => !prev)
    };

    const Settings = () => {
        
        const handleChangeComplete = (color) => {
            setPrimaryColor(color.hex);
        };
        return (
            <div>
                <IconButton onClick={handleSettingsOpen} style={{padding: "5px", color: "#ccc"}}>
                    <SettingsIcon />
                </IconButton>
                <Dialog open={settingsOpen} onClose={handleSettingsClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Settings</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Pick your preferred theme color below:
                        </DialogContentText>
                        <TwitterPicker 
                            triangle="hide" 
                            color={ primaryColor }
                            onChangeComplete={ handleChangeComplete }
                        />
                    </DialogContent>
                    <DialogContent>
                        <DialogContentText style={{display: "inline-block", marginRight: "10px"}}>
                            Toggle dark mode
                        </DialogContentText>
                        <FormGroup style={{display: "inline-block"}}>
                            <FormControlLabel
                                control={<Switch checked={darkState} onChange={toggleChecked} color="primary" />}
                            />
                        </FormGroup>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={(newColor) => handleSettingsClose(newColor)} color="primary">
                        Done
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <CssBaseline />
                <HideOnScroll {...props}>
                    <AppBar color="inherit">
                        <Toolbar>
                            <motion.div
                                variants={titleVariants} 
                                whileHover="hover"
                            >
                                <Grid container style={{margin: "10px 0px"}}>
                                    <Grid item>
                                        <Link 
                                            component={NavLink}
                                            to="/"
                                            style={{
                                                textDecoration: "none",
                                                color: "primary",
                                                fontSize: "24px",
                                                fontWeight: "bold",
                                                letterSpacing: "0.1rem",
                                                lineHeight: "40px",
                                                marginLeft:"8px"
                                            }}
                                            onClick={() => setCurrentPath("/")}
                                        >
                                            AI STUFF
                                        </Link>
                                    </Grid>
                                </Grid>
                            </motion.div>
                            <div style={{marginLeft: "auto"}}>
                                {mobile ? 
                                    (
                                        <>
                                            <IconButton
                                                color="inherit"
                                                aria-label="open drawer"
                                                edge="start"
                                                onClick={handleDrawerToggle}
                                                className={classes.menuButton}
                                            >
                                                <MenuIcon />
                                            </IconButton>
                                            <SwipeableDrawer
                                                variant="temporary"
                                                anchor={'right'}
                                                open={mobileOpen}
                                                onClose={handleDrawerToggle}
                                                ModalProps={{
                                                    keepMounted: true, 
                                                }}
                                                style={{width: "240px"}}
                                            >
                                                <IconButton style={{width: "40px", height: "40px", marginRight: "auto", margin: "10px 0px 0px 10px"}} onClick={handleDrawerToggle}>
                                                    <CloseIcon />
                                                </IconButton>
                                                <div style={{width: "240px", padding: "10px", textAlign: "center"}}>
                                                    <br></br>
                                                    <br></br>
                                                    <Settings />
                                                    <br></br>
                                                    <motion.div
                                                        initial={{y: 0}}
                                                        whileHover={{
                                                            color: primaryColor
                                                        }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                        <Link 
                                                            component={NavLink}
                                                            to="/home"
                                                            onClick={() => setCurrentPath("/home")}
                                                            style={{
                                                                textDecoration: "none",
                                                                color: "inherit",
                                                                fontSize: "15px",
                                                                letterSpacing: "0.08rem"
                                                            }}
                                                        >
                                                            Home
                                                        </Link>
                                                    </motion.div>
                                                    <br></br>
                                                    <motion.div
                                                        initial={{y: 0}}
                                                        whileHover={{
                                                            color: primaryColor
                                                        }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                        <Link 
                                                            component={NavLink}
                                                            to="/home"
                                                            onClick={() => setCurrentPath("/home")}
                                                            style={{
                                                                textDecoration: "none",
                                                                color: "inherit",
                                                                fontSize: "15px",
                                                                letterSpacing: "0.08rem"
                                                            }}
                                                        >
                                                            About
                                                        </Link>
                                                    </motion.div>
                                                    <br></br>
                                                    <motion.div
                                                        initial={{y: 0}}
                                                        whileHover={{
                                                            color: primaryColor
                                                        }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                        <Link 
                                                            component={NavLink}
                                                            to="/home"
                                                            onClick={() => setCurrentPath("/home")}
                                                            style={{
                                                                textDecoration: "none",
                                                                color: "inherit",
                                                                fontSize: "15px",
                                                                letterSpacing: "0.08rem"
                                                            }}
                                                        >
                                                            Resources
                                                        </Link>
                                                    </motion.div>
                                                    <br></br>
                                                    <div>
                                                        <Button
                                                            ref={anchorRef}
                                                            aria-controls={open ? 'menu-list-grow' : undefined}
                                                            aria-haspopup="true"
                                                            onClick={handleToggle}
                                                            style={{textTransform: "none", background: "none", fontSize: "15px", letterSpacing: "0.08rem"}}
                                                            color="primary"
                                                        >
                                                            Projects &nbsp;{open ? <ExpandLessIcon /> : <ExpandMoreIcon /> }
                                                        </Button>
                                                        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                                                        {({ TransitionProps, placement }) => (
                                                            <Grow
                                                            {...TransitionProps}
                                                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                                            >
                                                            <Paper elevation={4} style={{width: "180px", padding: "16px", textAlign: "center"}}>
                                                                <ClickAwayListener onClickAway={handleClose}>
                                                                <div>
                                                                    <div style={{textAlign: "center", marginBottom: "10px"}}>
                                                                        <motion.div
                                                                                initial={{y: 0}}
                                                                                whileHover={{
                                                                                    color: primaryColor
                                                                                }}
                                                                                transition={{ duration: 0.2 }}
                                                                            >
                                                                            <Link 
                                                                                component={NavLink}
                                                                                to="/summarizer"
                                                                                onClick={() => setCurrentPath("/summarizer")}
                                                                                style={{
                                                                                    textDecoration: "none",
                                                                                    color: "inherit",
                                                                                    fontSize: "15px",
                                                                                }}
                                                                            >
                                                                                Article Summarizer
                                                                            </Link>
                                                                        </motion.div>
                                                                    </div>
                                                                    <div style={{textAlign: "center", marginBottom: "10px"}}>
                                                                        <motion.div
                                                                                initial={{y: 0}}
                                                                                whileHover={{
                                                                                    color: primaryColor
                                                                                }}
                                                                                transition={{ duration: 0.2 }}
                                                                            >
                                                                            <Link 
                                                                                component={NavLink}
                                                                                to="/imagetotext"
                                                                                onClick={() => setCurrentPath("/imagetotext")}
                                                                                style={{
                                                                                    textDecoration: "none",
                                                                                    color: "inherit",
                                                                                    fontSize: "15px",
                                                                                }}
                                                                            >
                                                                                Image to Text
                                                                            </Link>
                                                                        </motion.div>
                                                                    </div>

                                                                    <div style={{textAlign: "center", marginBottom: "10px"}}>
                                                                        <motion.div
                                                                                initial={{y: 0}}
                                                                                whileHover={{
                                                                                    color: primaryColor
                                                                                }}
                                                                                transition={{ duration: 0.2 }}
                                                                            >
                                                                            <Link 
                                                                                component={NavLink}
                                                                                to="/handwriting"
                                                                                onClick={() => setCurrentPath("/handwriting")}
                                                                                style={{
                                                                                    textDecoration: "none",
                                                                                    color: "inherit",
                                                                                    fontSize: "15px",
                                                                                }}
                                                                            >
                                                                                Handwriting Recognition
                                                                            </Link>
                                                                        </motion.div>
                                                                    </div>

                                                                    <div style={{textAlign: "center", marginBottom: "10px"}}>
                                                                        <motion.div
                                                                                initial={{y: 0}}
                                                                                whileHover={{
                                                                                    color: primaryColor
                                                                                }}
                                                                                transition={{ duration: 0.2 }}
                                                                            >
                                                                            <Link 
                                                                                component={NavLink}
                                                                                to="/linreg"
                                                                                onClick={() => setCurrentPath("/linreg")}
                                                                                style={{
                                                                                    textDecoration: "none",
                                                                                    color: "inherit",
                                                                                    fontSize: "15px",
                                                                                }}
                                                                            >
                                                                                Linear Regression
                                                                            </Link>
                                                                        </motion.div>
                                                                    </div>

                                                                    <div style={{textAlign: "center", marginBottom: "10px"}}>
                                                                        <motion.div
                                                                                initial={{y: 0}}
                                                                                whileHover={{
                                                                                    color: primaryColor
                                                                                }}
                                                                                transition={{ duration: 0.2 }}
                                                                            >
                                                                            <Link 
                                                                                component={NavLink}
                                                                                to="#"
                                                                                onClick={() => setCurrentPath("/objectdetection")}
                                                                                style={{
                                                                                    textDecoration: "none",
                                                                                    color: "inherit",
                                                                                    fontSize: "15px",
                                                                                }}
                                                                            >
                                                                                Object Detection
                                                                            </Link>
                                                                        </motion.div>
                                                                    </div>
                                                                    
                                                                    <div style={{textAlign: "center", marginBottom: "10px"}}>
                                                                        <motion.div
                                                                                initial={{y: 0}}
                                                                                whileHover={{
                                                                                    color: primaryColor
                                                                                }}
                                                                                transition={{ duration: 0.2 }}
                                                                            >
                                                                            <Link 
                                                                                component={NavLink}
                                                                                to="#"
                                                                                onClick={() => setCurrentPath("#")}
                                                                                style={{
                                                                                    textDecoration: "none",
                                                                                    color: "inherit",
                                                                                    fontSize: "15px",
                                                                                }}
                                                                            >
                                                                                Music Generation
                                                                            </Link>
                                                                        </motion.div>
                                                                    </div>
                                                                </div>
                                                            </ClickAwayListener>
                                                            </Paper>
                                                            </Grow>
                                                        )}
                                                        </Popper>
                                                    </div>
                                                </div>
                                            </SwipeableDrawer>
                                        </>
                                    )
                                    :
                                        <Grid container direction="row" spacing={5}>
                                            <Grid item style={{lineHeight: "36px"}}>
                                                <motion.div
                                                        initial={{y: 0}}
                                                        whileHover={{
                                                            y: -2,
                                                            color: primaryColor
                                                        }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                    <Link 
                                                        component={NavLink}
                                                        to="/home"
                                                        onClick={() => setCurrentPath("/home")}
                                                        style={{
                                                            textDecoration: "none",
                                                            color: "inherit",
                                                            fontSize: "15px",
                                                            letterSpacing: "0.08rem",
                                                        }}
                                                    >
                                                        Home
                                                    </Link>
                                                </motion.div>
                                            </Grid>
                                            <Grid item style={{lineHeight: "36px"}}>
                                                <motion.div
                                                        initial={{y: 0}}
                                                        whileHover={{
                                                            y: -2,
                                                            color: primaryColor
                                                        }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                    <Link 
                                                        component={NavLink}
                                                        to="#"
                                                        onClick={() => setCurrentPath("#")}
                                                        style={{
                                                            textDecoration: "none",
                                                            color: "inherit",
                                                            fontSize: "15px",
                                                            letterSpacing: "0.08rem",
                                                        }}
                                                    >
                                                        About
                                                    </Link>
                                                </motion.div>
                                            </Grid>
                                            <Grid item style={{lineHeight: "36px"}}>
                                                <motion.div
                                                        initial={{y: 0}}
                                                        whileHover={{
                                                            y: -2,
                                                            color: primaryColor
                                                        }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                    <Link 
                                                        component={NavLink}
                                                        to="#"
                                                        onClick={() => setCurrentPath("#")}
                                                        style={{
                                                            textDecoration: "none",
                                                            color: "inherit",
                                                            fontSize: "15px",
                                                            letterSpacing: "0.08rem",
                                                        }}
                                                    >
                                                        Resources
                                                    </Link>
                                                </motion.div>
                                            </Grid>
                                            <Grid item>
                                                <div>
                                                    <Button
                                                        ref={anchorRef}
                                                        aria-controls={open ? 'menu-list-grow' : undefined}
                                                        aria-haspopup="true"
                                                        onClick={handleToggle}
                                                        style={{textTransform: "none", background: "none", fontSize: "15px", letterSpacing: "0.08rem"}}
                                                        color="primary"
                                                    >
                                                        Projects &nbsp;{open ? <ExpandLessIcon /> : <ExpandMoreIcon /> }
                                                    </Button>
                                                    <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                                                    {({ TransitionProps, placement }) => (
                                                        <Grow
                                                        {...TransitionProps}
                                                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                                        >
                                                        <Paper elevation={4} style={{width: "180px", padding: "16px", textAlign: "center"}}>
                                                            <ClickAwayListener onClickAway={handleClose}>
                                                                <div>
                                                                    <div style={{textAlign: "center", marginBottom: "10px"}}>
                                                                        <motion.div
                                                                                initial={{y: 0}}
                                                                                whileHover={{
                                                                                    color: primaryColor
                                                                                }}
                                                                                transition={{ duration: 0.2 }}
                                                                            >
                                                                            <Link 
                                                                                component={NavLink}
                                                                                to="/summarizer"
                                                                                onClick={() => setCurrentPath("/summarizer")}
                                                                                style={{
                                                                                    textDecoration: "none",
                                                                                    color: "inherit",
                                                                                    fontSize: "15px",
                                                                                }}
                                                                            >
                                                                                Article Summarizer
                                                                            </Link>
                                                                        </motion.div>
                                                                    </div>
                                                                    <div style={{textAlign: "center", marginBottom: "10px"}}>
                                                                        <motion.div
                                                                                initial={{y: 0}}
                                                                                whileHover={{
                                                                                    color: primaryColor
                                                                                }}
                                                                                transition={{ duration: 0.2 }}
                                                                            >
                                                                            <Link 
                                                                                component={NavLink}
                                                                                to="/imagetotext"
                                                                                onClick={() => setCurrentPath("/imagetotext")}
                                                                                style={{
                                                                                    textDecoration: "none",
                                                                                    color: "inherit",
                                                                                    fontSize: "15px",
                                                                                }}
                                                                            >
                                                                                Image to Text
                                                                            </Link>
                                                                        </motion.div>
                                                                    </div>

                                                                    <div style={{textAlign: "center", marginBottom: "10px"}}>
                                                                        <motion.div
                                                                                initial={{y: 0}}
                                                                                whileHover={{
                                                                                    color: primaryColor
                                                                                }}
                                                                                transition={{ duration: 0.2 }}
                                                                            >
                                                                            <Link 
                                                                                component={NavLink}
                                                                                to="/handwriting"
                                                                                onClick={() => setCurrentPath("/handwriting")}
                                                                                style={{
                                                                                    textDecoration: "none",
                                                                                    color: "inherit",
                                                                                    fontSize: "15px",
                                                                                }}
                                                                            >
                                                                                Handwriting Recognition
                                                                            </Link>
                                                                        </motion.div>
                                                                    </div>

                                                                    <div style={{textAlign: "center", marginBottom: "10px"}}>
                                                                        <motion.div
                                                                                initial={{y: 0}}
                                                                                whileHover={{
                                                                                    color: primaryColor
                                                                                }}
                                                                                transition={{ duration: 0.2 }}
                                                                            >
                                                                            <Link 
                                                                                component={NavLink}
                                                                                to="/linreg"
                                                                                onClick={() => setCurrentPath("/linreg")}
                                                                                style={{
                                                                                    textDecoration: "none",
                                                                                    color: "inherit",
                                                                                    fontSize: "15px",
                                                                                }}
                                                                            >
                                                                                Linear Regression
                                                                            </Link>
                                                                        </motion.div>
                                                                    </div>

                                                                    <div style={{textAlign: "center", marginBottom: "10px"}}>
                                                                        <motion.div
                                                                                initial={{y: 0}}
                                                                                whileHover={{
                                                                                    color: primaryColor
                                                                                }}
                                                                                transition={{ duration: 0.2 }}
                                                                            >
                                                                            <Link 
                                                                                component={NavLink}
                                                                                to="/objectdetection"
                                                                                onClick={() => setCurrentPath("/objectdetection")}
                                                                                style={{
                                                                                    textDecoration: "none",
                                                                                    color: "inherit",
                                                                                    fontSize: "15px",
                                                                                }}
                                                                            >
                                                                                Object Detection
                                                                            </Link>
                                                                        </motion.div>
                                                                    </div>
                                                                    
                                                                    <div style={{textAlign: "center", marginBottom: "10px"}}>
                                                                        <motion.div
                                                                                initial={{y: 0}}
                                                                                whileHover={{
                                                                                    color: primaryColor
                                                                                }}
                                                                                transition={{ duration: 0.2 }}
                                                                            >
                                                                            <Link 
                                                                                component={NavLink}
                                                                                to="#"
                                                                                onClick={() => setCurrentPath("#")}
                                                                                style={{
                                                                                    textDecoration: "none",
                                                                                    color: "inherit",
                                                                                    fontSize: "15px",
                                                                                }}
                                                                            >
                                                                                Music Generation
                                                                            </Link>
                                                                        </motion.div>
                                                                    </div>
                                                                </div>
                                                            </ClickAwayListener>
                                                        </Paper>
                                                        </Grow>
                                                    )}
                                                    </Popper>
                                                </div>
                                            </Grid>
                                            <Grid item style={{lineHeight: "36px", paddingLeft: "0px"}}>
                                                <Settings />
                                            </Grid>
                                    </Grid>
                                }
                                
                            </div>
                        </Toolbar>
                    </AppBar>
                </HideOnScroll>
                <main className={classes.content}>
                    <Toolbar />
                    {props.children}
                </main>
            </div>
        </ThemeProvider>
    )
}
export default Navbar;