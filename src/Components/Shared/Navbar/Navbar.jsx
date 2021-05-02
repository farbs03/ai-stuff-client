import React, {useState} from "react"
import {AppBar, Grid, Link, IconButton } from "@material-ui/core"
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
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
import blue from '@material-ui/core/colors/blue';
import Logo from "./aistuff.png"
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Hidden from '@material-ui/core/Hidden';
import MenuIcon from '@material-ui/icons/Menu';

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

const Navbar = (props) => {
    const classes = useStyles();

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
  
    return (
        <>
            <CssBaseline />
            <HideOnScroll {...props}>
                <AppBar color="inherit">
                    <Toolbar>
                        <motion.div
                            variants={titleVariants} 
                            whileHover="hover"
                        >
                            <Grid container style={{margin: "5px 0px"}}>
                                <Grid item>
                                    <img
                                        src={Logo}
                                        style={{width: "50px", height: "50px"}}
                                        alt="logo"
                                    />
                                </Grid>
                                <Grid item>
                                    <motion.a
                                        initial={{y: 0}}
                                        whileHover={{
                                            color: blue[400]
                                        }}
                                        transition={{ duration: 0.2 }}
                                        href="/home"
                                        style={{
                                            textDecoration: "none",
                                            color: "inherit",
                                            fontSize: "24px",
                                            fontWeight: "bold",
                                            letterSpacing: "0.1rem",
                                            lineHeight: "50px",
                                            marginLeft:"8px"
                                        }}
                                    >
                                        AI STUFF
                                    </motion.a>
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
                                            <div style={{width: "240px", padding: "10px", textAlign: "center"}}>
                                                <br></br>
                                                <br></br>
                                                <motion.div
                                                initial={{y: 0}}
                                                whileHover={{
                                                    y: -2,
                                                }}
                                                transition={{ duration: 0.2 }}>
                                                    <motion.a
                                                        initial={{y: 0}}
                                                        whileHover={{
                                                            color: blue[400]
                                                        }}
                                                        whileTap={{
                                                            color: blue[400]
                                                        }}
                                                        transition={{ duration: 0.2 }}
                                                        href="/home"
                                                        style={{
                                                            textDecoration: "none",
                                                            color: "inherit",
                                                            fontSize: "15px",
                                                            letterSpacing: "0.08rem",
                                                        }}
                                                    >
                                                        Home
                                                    </motion.a>
                                                </motion.div>
                                                <br></br>
                                                <motion.div
                                                initial={{y: 0}}
                                                whileHover={{
                                                    y: -2,
                                                }}
                                                transition={{ duration: 0.2 }}>
                                                    <motion.a
                                                        initial={{y: 0}}
                                                        whileHover={{
                                                            color: blue[400]
                                                        }}
                                                        whileTap={{
                                                            color: blue[400]
                                                        }}
                                                        transition={{ duration: 0.2 }}
                                                        href="#"
                                                        style={{
                                                            textDecoration: "none",
                                                            color: "inherit",
                                                            fontSize: "15px",
                                                            letterSpacing: "0.08rem",
                                                        }}
                                                    >
                                                        About
                                                    </motion.a>
                                                </motion.div>
                                                <br></br>
                                                <motion.div
                                                initial={{y: 0}}
                                                whileHover={{
                                                    y: -2,
                                                }}
                                                transition={{ duration: 0.2 }}>
                                                    <motion.a
                                                        initial={{y: 0}}
                                                        whileHover={{
                                                            color: blue[400]
                                                        }}
                                                        whileTap={{
                                                            color: blue[400]
                                                        }}
                                                        transition={{ duration: 0.2 }}
                                                        href="#"
                                                        style={{
                                                            textDecoration: "none",
                                                            color: "inherit",
                                                            fontSize: "15px",
                                                            letterSpacing: "0.08rem",
                                                        }}
                                                    >
                                                        Resources
                                                    </motion.a>
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
                                                                        <motion.a
                                                                            whileHover={{
                                                                                color: blue[400]
                                                                            }}
                                                                            transition={{ duration: 0.4 }}
                                                                            href="/summarizer"
                                                                            style={{
                                                                                textDecoration: "none",
                                                                                color: "inherit",
                                                                                textAlign: "center"
                                                                            }}
                                                                        >
                                                                            Article Summarizer
                                                                        </motion.a>
                                                                    </div>
                                                                    <div style={{textAlign: "center"}}>
                                                                        <motion.a
                                                                            whileHover={{
                                                                                color: blue[400]
                                                                            }}
                                                                            transition={{ duration: 0.4 }}
                                                                            href="/imagetotext"
                                                                            style={{
                                                                                textDecoration: "none",
                                                                                color: "inherit",
                                                                                textAlign: "center"
                                                                            }}
                                                                        >
                                                                            Image to text
                                                                        </motion.a>
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
                                            }}
                                            transition={{ duration: 0.2 }}>
                                                <motion.a
                                                    initial={{y: 0}}
                                                    whileHover={{
                                                        color: blue[400]
                                                    }}
                                                    transition={{ duration: 0.2 }}
                                                    href="/home"
                                                    style={{
                                                        textDecoration: "none",
                                                        color: "inherit",
                                                        fontSize: "15px",
                                                        letterSpacing: "0.08rem",
                                                    }}
                                                >
                                                    Home
                                                </motion.a>
                                            </motion.div>
                                        </Grid>
                                        <Grid item style={{lineHeight: "36px"}}>
                                            <motion.div
                                            initial={{y: 0}}
                                            whileHover={{
                                                y: -2,
                                            }}
                                            transition={{ duration: 0.2 }}>
                                                <motion.a
                                                    initial={{y: 0}}
                                                    whileHover={{
                                                        color: blue[400]
                                                    }}
                                                    transition={{ duration: 0.2 }}
                                                    href="#"
                                                    style={{
                                                        textDecoration: "none",
                                                        color: "inherit",
                                                        fontSize: "15px",
                                                        letterSpacing: "0.08rem",
                                                    }}
                                                >
                                                    About
                                                </motion.a>
                                            </motion.div>
                                        </Grid>
                                        <Grid item style={{lineHeight: "36px"}}>
                                            <motion.div
                                            initial={{y: 0}}
                                            whileHover={{
                                                y: -2,
                                            }}
                                            transition={{ duration: 0.2 }}>
                                                <motion.a
                                                    initial={{y: 0}}
                                                    whileHover={{
                                                        color: blue[400]
                                                    }}
                                                    transition={{ duration: 0.2 }}
                                                    href="#"
                                                    style={{
                                                        textDecoration: "none",
                                                        color: "inherit",
                                                        fontSize: "15px",
                                                        letterSpacing: "0.08rem",
                                                    }}
                                                >
                                                    Resources
                                                </motion.a>
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
                                                                    <motion.a
                                                                        whileHover={{
                                                                            color: blue[400]
                                                                        }}
                                                                        transition={{ duration: 0.4 }}
                                                                        href="/summarizer"
                                                                        style={{
                                                                            textDecoration: "none",
                                                                            color: "inherit",
                                                                            textAlign: "center"
                                                                        }}
                                                                    >
                                                                        Article Summarizer
                                                                    </motion.a>
                                                                </div>
                                                                <div style={{textAlign: "center"}}>
                                                                    <motion.a
                                                                        whileHover={{
                                                                            color: blue[400]
                                                                        }}
                                                                        transition={{ duration: 0.4 }}
                                                                        href="/imagetotext"
                                                                        style={{
                                                                            textDecoration: "none",
                                                                            color: "inherit",
                                                                            textAlign: "center"
                                                                        }}
                                                                    >
                                                                        Image to text
                                                                    </motion.a>
                                                                </div>
                                                            </div>
                                                        </ClickAwayListener>
                                                    </Paper>
                                                    </Grow>
                                                )}
                                                </Popper>
                                            </div>
                                        </Grid>
                                </Grid>
                            }
                            
                        </div>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
        </>
    )
}
export default Navbar;