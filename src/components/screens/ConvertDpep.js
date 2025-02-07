import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withStyles } from "@mui/styles";
import {Grid, Typography, Button} from '@mui/material';
import Web3Utils from 'web3-utils';
import Web3StatusRedirector from "./Web3StatusRedirector";

const styles = theme => ({
    root: {
        minHeight: "80vh",
    },
    heading: {
        margin: (theme.spacing.unit * 4) + "px 0",
    },
    claimSection: {
        padding: theme.spacing.unit * 4,
    }
});

class ConvertDpep extends Component {

    constructor(props) {
        super(props);

        this.state = {buttonClicked: false};
    }

    componentDidMount() {
        const {contracts, wallet} = this.props;
        if(contracts.PepeGrinder) {
            this.address = Object.keys(wallet)[0];
            const {callID, thunk} = contracts.PepeGrinder.methods.balanceOf.cacheCall({},this.address);
            this.callID = callID;
            this.props.dispatch(thunk);
        }
    }

    claimPepe = () => {
        const {contracts, wallet} = this.props;

        const {txID, thunk} = contracts.PepeGrinder.methods.claimPepe.trackedSend(
            {from: Object.keys(wallet)[0]});

        this.setState({
            txTrackingId: txID,
        });

        this.props.dispatch(thunk);

        this.setState({
            buttonClicked: true
        });
    };

    render() {
        const {classes, data} = this.props;

        let dpepBalance = undefined;
        if(data[this.callID] && data[this.callID].value) {
            dpepBalance = Web3Utils.fromWei(data[this.callID].value[0]);
            //dpepBalance = 100;
        }
        return(
            <div className={classes.root}>
                <Grid container justify="center">
                    <Grid item xs={12} md={6}>
                        <Typography gutterBottom className={classes.heading} align="center" variant="display3">
                            Convert DPEP into CPEP
                        </Typography>

                        <Typography gutterBottom align="center">
                            You can claim 1 CryptoPepe(CPEP) with 100 Pepe Dust(DPEP). If you have 100 DPEP you can click the button below to claim a CPEP.
                        </Typography>

                        <Typography variant="subheading" className={classes.claimSection} align="center">
                            Your DPEP balance: {(dpepBalance !== undefined && dpepBalance !== null) ? dpepBalance : "Loading"} <br />
                            {dpepBalance >= 100 && (<Button onClick={this.claimPepe} size="large" variant="contained" color="secondary" className={classes.button}>
                                Claim Pepe
                            </Button>)}
                        </Typography>

                        {this.state.buttonClicked && (
                            <Typography variant="subheading" align="center">Confirm the transaction in MetaMask or click again to claim another CryptoPepe.</Typography>
                        )}
                    </Grid>
                </Grid>
            </div>
        )
    }

}


const styledConvertDpep = withStyles(styles)(ConvertDpep);
const ConnectedConvertDpep = connect(
    state => ({
        contracts: state.redapp.contracts,
        data: state.redapp.tracking.calls,
        wallet: state.redapp.tracking.accounts.wallet
    })
)(styledConvertDpep);


const ConnectedConvertDpepWeb3Checked = () => {
    const dpepConvertCreator = () => <ConnectedConvertDpep/>;
    // web3 needs to be active, and there needs to be an account available.
    return <Web3StatusRedirector dstAddrOk={dpepConvertCreator}/>;
};


export default ConnectedConvertDpepWeb3Checked;
