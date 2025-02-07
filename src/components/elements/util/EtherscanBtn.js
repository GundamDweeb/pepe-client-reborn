import AdvancedLink from "./AdvancedLink";
import {Button} from "@mui/material";
import {OpenInNew} from "@mui/icons-material";
import {withStyles} from "@mui/styles";
import React from "react";
import PropTypes from "prop-types";
import {etherscanBaseLink} from "../../../web3Settings";

const styles = theme => ({
    etherscanBtn: {
        backgroundColor: theme.palette.type === "light" ? "#3498db" : "#174763",
        '&:hover': {
            backgroundColor: theme.palette.type === "light" ? "#36a8ed" : "#1b587c",
        },
        color: "#fff"
    }
});

const EtherscanBtn = ({children, classes, link, size}) => (
    <AdvancedLink to={etherscanBaseLink + link} external newTab disableLinkPadding>
        <Button className={classes.etherscanBtn} size={size}>
            {children}
            <OpenInNew className={classes.rightIcon} />
        </Button>
    </AdvancedLink>
);

EtherscanBtn.defaultProps = {
    size: "small"
};

EtherscanBtn.propTypes = {
    classes: PropTypes.object.isRequired,
    link: PropTypes.string,
    size: PropTypes.string
};

export default withStyles(styles)(EtherscanBtn);