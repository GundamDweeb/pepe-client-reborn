import React from "react";
import { connect } from 'react-redux';
import { ThemeProvider } from "@mui/styles";
import PropTypes from 'prop-types';
import pageContext from "../getPageContext";
import {createGlobalTheme} from "../theming";
import {CssBaseline} from "@mui/material";
import CryptoPepeApp from "./CryptoPepeApp";
import {withRouter} from "react-router-dom";


class AppWrapperInner extends React.Component {

    constructor() {
        super();

        this.state = {
            uiTheme: null,
            theme: pageContext.theme
        }
    }


    static getDerivedStateFromProps(props, state) {
        if (!props.uiTheme) return null;
        if (
            !state.uiTheme || (
                state.uiTheme.paletteType !== props.uiTheme.paletteType ||
                state.uiTheme.direction !== props.uiTheme.direction
            )
        ) {
            const nextTheme = createGlobalTheme(props.uiTheme);

            return {
                uiTheme: props.uiTheme,
                theme: nextTheme
            };

        }
        return null;
    }


    componentDidMount() {
        // Hide loader animation
        document.getElementById("page-loader-anim").style.display = "none";
        if (document.body && !!this.state.uiTheme) {
            document.body.dir = this.state.uiTheme.direction;
        }
    }

    componentWillUnmount() {
        document.getElementById("page-loader-anim").style.display = "block";
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (document.body && !!this.state.uiTheme) {
            document.body.dir = this.state.uiTheme.direction;
        }
    }

    render() {
        return (
            <div>
                <CssBaseline />
                <ThemeProvider theme={this.state.theme}>
                    <CryptoPepeApp />
                </ThemeProvider>
            </div>
        );
    }

}

// Hack to separate lifecycles from inner and redux-connected outer.
const AppWrapper = (props) => <AppWrapperInner {...props}/>;

AppWrapper.propTypes = {
    uiTheme: PropTypes.object.isRequired,
    wallet: PropTypes.object
};

const connectedAppWrapper = connect(state => ({
    uiTheme: state.theme,
    wallet: state.wallet,
}))(AppWrapper);

//Note: withRouter fixes an update propagation issue caused by redux.
// See: https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
//get theme state from redux store
export default withRouter(connectedAppWrapper);
