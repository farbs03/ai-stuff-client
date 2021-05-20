import React, {useState} from "react"
import {Route, Switch} from 'react-router-dom'

import Summarizer from "./Components/Summarizer/Summarizer"
import Home from "./Components/Home/Home"
import ImageToText from "./Components/ImageToText/ImageToText"
import Handwriting from "./Components/Handwriting/Handwriting"
import LinearRegression from "./Components/LinearRegression/LinearRegression"
import ObjectDetection from "./Components/ObjectDetection/ObjectDetection"

import Navbar from "./Components/Shared/Navbar/Navbar"

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider, Toolbar } from '@material-ui/core'
import {blue} from '@material-ui/core/colors';


const App = () => {
  
  return (
    <Switch>
      <Navbar>
        <Route exact path="/summarizer" component={Summarizer}/>
        <Route exact path="/imagetotext" component={ImageToText}/>
        <Route exact path="/handwriting" component={Handwriting}/>
        <Route exact path="/linreg" component={LinearRegression}/>
        <Route exact path="/objectdetection" component={ObjectDetection}/>
        <Route exact path="/home" component={Home}/>
        <Route exact path="/" component={Home}/>
      </Navbar>
    </Switch>
  );
}

export default App;
