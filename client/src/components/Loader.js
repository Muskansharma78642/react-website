import React, { useEffect, useRef } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";


const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: 'blur' ,
    margin: 20,
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative"
  },
  fabProgress: {
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1
  }
}));

const Loader = () => {
    const classes = useStyles();
    const timer = useRef();

  useEffect(() => {
      return () => {
          clearTimeout(timer.current);
        };
  },[])
  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <CircularProgress size={68} className={classes.fabProgress} />
      </div>
    </div>
  )
}

export default Loader