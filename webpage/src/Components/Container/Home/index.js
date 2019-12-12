import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        '& > *': {
        margin: theme.spacing(1),
        },
    },
    bigAvatar: {
        width: "100%",
        height: "100%",
    },
}));

export default function Home(){
    const classes = useStyles();
    return(
        <div>
            <Grid container item xs={12} justify="center">
                <Avatar variant="square" src="/images/emkodeLogo.jpg" className={classes.bigAvatar} />
            </Grid>
        </div>
    );
}