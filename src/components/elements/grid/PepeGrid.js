import React, { Component } from "react";
import { withStyles } from "@mui/styles";
import PropTypes from "prop-types";
import PepeGridItem from "./PepeGridItem";
import {Grid} from "@mui/material";

const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing.unit
    }
});

class PepeGrid extends Component {

    render() {

        const { classes, items, ...otherProps } = this.props;

        return (
            <div className={classes.root}>
                <Grid container spacing={40} {...otherProps}>
                    {(items || []).map(v => (
                        <Grid key={v.pepeId || "pepe"} item>
                            <PepeGridItem pepe={v}/>
                        </Grid>
                    ))}
                </Grid>
            </div>
        )
    }
}


PepeGrid.propTypes = {
    classes: PropTypes.object.isRequired,
    items: PropTypes.arrayOf(PropTypes.object)
};

export default withStyles(styles)(PepeGrid);