import React from "react";
import {withStyles} from "@mui/styles";
import PropTypes from "prop-types";
import {Typography} from "@mui/material";

const styles = (theme) => ({

});

const PepeBio = (props) => {
    const {pepe, classes} = props;

    const isLoading = pepe === undefined;

    let nameEl;
    if (isLoading) {
        nameEl = (<span>Pepe ?</span>)
    } else if (pepe.named) {
        nameEl = (<strong>{pepe.name}</strong>)
    } else {
        nameEl = (<span>Pepe #{pepe.pepeId}</span>)
    }

    return (
        <div>
            <Typography variant="headline" component="h2">
                Hello, I'm {nameEl}
            </Typography>
            <Typography color="textSecondary">
                {pepe.bio_title || "?"}
            </Typography>
            <br/>
            <Typography component="p">
                {pepe.bio_description || "???"}
            </Typography>
        </div>
    );

};

PepeBio.propTypes = {
    // when pepe is undefined -> loading placeholder is shown
    pepe: PropTypes.shape({
        name: PropTypes.string,
        pepeId: PropTypes.string,
        bio_title: PropTypes.string,
        bio_description: PropTypes.string
    })
};

export default withStyles(styles)(PepeBio);
