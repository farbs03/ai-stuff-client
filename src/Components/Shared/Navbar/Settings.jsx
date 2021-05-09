import React from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SettingsIcon from "@material-ui/icons/Settings"
import { MaterialPicker } from 'react-color';

import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const Settings = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [checked, setChecked] = React.useState(false);

    const toggleChecked = () => {
        setChecked((prev) => !prev);
        localStorage.setItem("theme", "dark")
    };
  return (
    <div>
      <IconButton onClick={handleClickOpen} style={{padding: "5px", color: "#ccc"}}>
        <SettingsIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Settings</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Pick your preferred theme color below:
            </DialogContentText>
            <MaterialPicker />
        </DialogContent>
        <DialogContent>
            <DialogContentText>
                Toggle dark mode:
            </DialogContentText>
            <FormGroup>
                <FormControlLabel
                    control={<Switch checked={checked} onChange={toggleChecked} color="primary" />}
                    label="Dark Mode"
                />
            </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default Settings;