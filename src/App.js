import React from "react"
import {Route, Switch} from 'react-router-dom'

import Summarizer from "./Components/Summarizer/Summarizer"
import Home from "./Components/Home/Home"

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core'
import blue from '@material-ui/core/colors/blue';

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
      <Switch>
        <Route exact path="/summarizer" component={Summarizer}/>
        <Route exact path="/home" component={Home}/>
        <Route exact path="/" component={Summarizer}/>
      </Switch>
    </ThemeProvider>
  );
}

export default App;
