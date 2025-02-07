import React from "react";
import {withStyles} from "@mui/styles";
import {Button, Grid, Typography} from "@mui/material";
import AdvancedLink from "../elements/util/AdvancedLink";
import Web3StatusRedirector from "./Web3StatusRedirector";

const styles = theme => ({
    root: {
        flex: '1 0 100%',
        marginTop: 8 * theme.spacing.unit
    },
    mainContent: {
        textAlign: "center",
        paddingBottom: 500
    },
    link: {
        textDecoration: "underline"
    }
});

const tryEthereumConnect = () => {
    if (window.ethereum) {
        window.ethereum.enable();
    }
};

const NoAccountInner = ({classes}) => (
    <div className={classes.root}>
        <Grid container spacing={40} justify="center">
            <Grid item xs={12}>
                <Grid container justify="center">
                    <Grid item>
                        <Typography variant="display3" component="h2">
                            Not logged in.
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={10} md={8} lg={6}>
                <Grid container>
                    <Grid item xs={12} className={classes.mainContent}>
                        <Typography variant="title" component="h3">
                            It looks like you are using a Web3 wallet, but are not providing us with a wallet
                            address.
                        </Typography>
                        <br/>
                        <Typography variant="body1" component="p">
                            Normally, Metamask (or your Web3-supporting wallet of choice) provides this
                            automatically when logged in. Are you logged in?
                        </Typography>

                        <br/>

                        {window.ethereum && <div>
                            <Typography variant="body1" component="p">
                                Newer Web3 wallets may ask for permission before sharing your ethereum address. Try the
                                button below to trigger a permission-request.
                            </Typography>
                            <br/>
                            <Button variant="raised" color="secondary"
                                    className={classes.button}
                                    onClick={tryEthereumConnect}>
                                Connect account
                            </Button>
                        </div>}


                        <br/>
                        {!window.ethereum && <div>
                            <Typography variant="title" component="h3">
                                You do not know what to do, and are not using Metamask? Install Metamask, check again.
                            </Typography>
                            <br/>
                            <Typography variant="body1" component="p">
                                We support Metamask, as so many people use it, and highly recommend it for new users.
                                See the <AdvancedLink to="/faq" disableLinkPadding
                                                      variant="body2" className={classes.link}>
                                Frequently Asked Questions</AdvancedLink> on how to install Metamask, if you have not
                                already.
                                It's a user-friendly Web3 wallet provider for in your web browser.<br/>
                                <i>Other Web3 wallets are also supported, but may be less user friendly or harder to
                                    troubleshoot.</i>
                            </Typography>
                            <br/>
                        </div>}

                        <br/>
                        <Typography variant="body1" component="p">
                            Feel free to ask on the telegram group for support, if everything above doesn't help.
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </div>
);

const NoAccount = ({classes}) => {
    return <Web3StatusRedirector dstNoAccount={() => <NoAccountInner classes={classes}/>}/>;
};

export default withStyles(styles)(NoAccount);
