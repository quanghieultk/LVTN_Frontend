import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '25ch',
    },
  }));
export function ManageRestaurant(props) {
    const classes = useStyles();
    return (
        <Card>
            <div>
                <TextField
                    id="standard-full-width"
                    label="Tên nhà hàng"
                    style={{ margin: 8 }}
                    placeholder=""
                    helperText="Full width!"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    label=""
                    id="margin-none"
                    defaultValue="Default Value"
                    className={classes.textField}
                    helperText="Some important text"
                />
                <TextField
                    label="Dense"
                    id="margin-dense"
                    defaultValue="Default Value"
                    className={classes.textField}
                    helperText="Some important text"
                    margin="dense"
                />
                <TextField
                    label="Normal"
                    id="margin-normal"
                    defaultValue="Default Value"
                    className={classes.textField}
                    helperText="Some important text"
                    margin="normal"
                />
            </div>
            <div>
                <TextField
                    id="filled-full-width"
                    label="Label"
                    style={{ margin: 8 }}
                    placeholder="Placeholder"
                    helperText="Full width!"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="filled"
                />
                <TextField
                    label="None"
                    id="filled-margin-none"
                    defaultValue="Default Value"
                    className={classes.textField}
                    helperText="Some important text"
                    variant="filled"
                />
                <TextField
                    label="Dense"
                    id="filled-margin-dense"
                    defaultValue="Default Value"
                    className={classes.textField}
                    helperText="Some important text"
                    margin="dense"
                    variant="filled"
                />
                <TextField
                    label="Normal"
                    id="filled-margin-normal"
                    defaultValue="Default Value"
                    className={classes.textField}
                    helperText="Some important text"
                    margin="normal"
                    variant="filled"
                />
            </div>
        </Card>
    );
}