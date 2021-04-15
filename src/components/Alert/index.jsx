/* eslint-disable react/prop-types */
import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CustomizedSnackbars(props) {
  const classes = useStyles();

  // eslint-disable-next-line react/prop-types
  // eslint-disable-next-line no-unused-vars
  const {name, status} =props;


  return (
    <div className={classes.root}>
        <Alert severity={status}>
         {name}
        </Alert>
    </div>
  );
}

