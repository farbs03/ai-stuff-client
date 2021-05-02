import React from "react"
import {Route, Switch} from 'react-router-dom'

import Summarizer from "./Components/Summarizer/Summarizer"
import Home from "./Components/Home/Home"
import ImageToText from "./Components/ImageToText/ImageToText"
import Navbar from "./Components/Shared/Navbar/Navbar"

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider, Toolbar } from '@material-ui/core'
import {blue} from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[400]
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Toolbar />
      <div style={{padding: "16px"}}>
        <Switch>
          <Route exact path="/summarizer" component={Summarizer}/>
          <Route exact path="/imagetotext" component={ImageToText}/>
          <Route exact path="/home" component={Home}/>
          <Route exact path="/" component={Home}/>
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
