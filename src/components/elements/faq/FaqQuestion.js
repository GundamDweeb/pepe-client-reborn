import React, {Component} from "react";
import {
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PropTypes from "prop-types";
import {withStyles} from "@mui/styles";

const styles = theme => ({
    heading: {
        ...theme.typography.headline,
        fontSize: '1.3rem'
    },
    text: {
        ...theme.typography.body1,
        fontSize: '1rem'
    }
});

class FaqQuestion extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const classes = this.props.classes;
        return (
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                    <div className={classes.heading}>{this.props.question}</div>
                </AccordionSummary>
                <AccordionDetails>
                    <div className={classes.text} dangerouslySetInnerHTML={{__html: this.props.answer}}/>
                </AccordionDetails>
            </Accordion>
        )
    }

}

FaqQuestion.propTypes = {
    classes: PropTypes.object.isRequired,
    question: PropTypes.string,
    answer: PropTypes.string
};

export default withStyles(styles)(FaqQuestion);