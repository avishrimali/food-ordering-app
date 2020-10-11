import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import Container from "@material-ui/core/Container";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';

class NewAddress extends Component {
    constructor() {
        super();
        this.state = {
            flatBuildingNo: "",
            flatBuildingNoRequired: false,
            locality: "",
            localityRequired: false,
            city: "",
            cityRequired: false,
            pincode: "",
            pincodeRequired: false,
            isPincodeValid: true,
            stateIndex: -1,
            stateIndexRequired: false,
            newAddressError: false,
            newAddressErrorCode: null,
            newAddressErrorMsg: null,
            newAddressPageFloatingAlert: false,
            newAddressPageFloatingAlertMsg: "",
        };
    }

    commonInputChangeHandler = e => {
        var stateName = e.target.id;
        var requiredflag = e.target.id + 'Required';
        var requiredflagVal = false;
        if (!e.target.value) {
            requiredflagVal = true;
        } else {
            requiredflagVal = false;
        }
        this.setState({
            [stateName]: e.target.value,
            [requiredflag]: requiredflagVal
        });
    }
    selectStateIndexHandler = e => {
        var requiredflagVal = false;
        if (e.target.value === -1) {
            requiredflagVal = true;
        } else {
            requiredflagVal = false;
        }
        this.setState({
            stateIndex: e.target.value,
            stateIndexRequired: requiredflagVal
        });
    }
    // closing alert
    closeFloatingAlert = () => {
        this.setState({
            newAddressPageFloatingAlert: false,
            newAddressPageFloatingAlertMsg: ""
        });
    }
    // on adding new address submit
    onNewAddressSubmit = () => {
        if (this.state.flatBuildingNo === "") {
            this.setState({
                flatBuildingNoRequired: true
            });
        }
        if (this.state.locality === "") {
            this.setState({
                localityRequired: true
            });
        }
        if (this.state.city === "") {
            this.setState({
                cityRequired: true
            });
        }
        if (this.state.pincode === "") {
            this.setState({
                pincodeRequired: true
            });
        }
        if (this.state.stateIndex === -1) {
            this.setState({
                stateIndexRequired: true
            });
        }

        if (this.state.flatBuildingNoRequired
            || this.state.localityRequired
            || this.state.cityRequired
            || this.state.pincodeRequired
            || this.state.stateIndexRequired) {
            return;
        }
        if (!this.state.pincode.match(/^\d{6}$/)) {
            this.setState({
                isPincodeValid: false
            });
            return;
        }

        var url = this.props.baseUrl + "/address";

        fetch(
            url,
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Accept': 'application/json;charset=UTF-8',
                    'authorization': 'Bearer ' + sessionStorage.getItem("access-token")
                },
                body: JSON.stringify({
                    "city": this.state.city,
                    "flat_building_name": this.state.flatBuildingNo,
                    "locality": this.state.locality,
                    "pincode": this.state.pincode,
                    "state_uuid": this.props.statesData[this.state.stateIndex].id
                })
            }
        ).then((response) => {
            if (response.status === 201) {
                response.json().then((json) => {
                    this.setState({
                        newAddressPageFloatingAlert: true,
                        newAddressPageFloatingAlertMsg: json.status
                    });
                    this.setState({
                        flatBuildingNo: "",
                        locality: "",
                        city: "",
                        pincode: "",
                        stateIndex: -1,
                    });
                    this.props.newAddressAddedCallBack();
                })
            } else {
                response.json().then((json) => {
                    this.setState({
                        newAddressError: true,
                        newAddressErrorMsg: json.status
                    });
                })
            }
        }, error => {
            this.setState({
                newAddressError: true,
                newAddressErrorMsg: "Error while making request to FoodOrderingApp Backend"
            });
        })
    }

    render() {
        return (
            <div>
                <Card style={{ width: '25%', minWidth: '275px' }}>
                    <CardContent>
                        <Container id="container-newaddress-form" >
                            <FormControl className="newaddress-flatBuildingNo-form" required>
                                <InputLabel htmlFor="flatBuildingNo">Flat / Building No.</InputLabel>
                                <Input
                                    id="flatBuildingNo"
                                    type="text"
                                    value={this.state.flatBuildingNo}
                                    onChange={this.commonInputChangeHandler}
                                />
                                {this.state.flatBuildingNoRequired ? (
                                    <FormHelperText>
                                        <span className="red">required</span>
                                    </FormHelperText>
                                ) : null}
                            </FormControl>
                            <br />
                            <br />
                            <FormControl className="newaddress-locality-form" required>
                                <InputLabel htmlFor="locality">Locality</InputLabel>
                                <Input
                                    id="locality"
                                    type="text"
                                    value={this.state.locality}
                                    onChange={this.commonInputChangeHandler}
                                />
                                {this.state.localityRequired ? (
                                    <FormHelperText>
                                        <span className="red">required</span>
                                    </FormHelperText>
                                ) : null}
                            </FormControl>
                            <br />
                            <br />
                            <FormControl className="newaddress-city-form" required>
                                <InputLabel htmlFor="city">City</InputLabel>
                                <Input
                                    id="city"
                                    type="text"
                                    value={this.state.city}
                                    onChange={this.commonInputChangeHandler}
                                />
                                {this.state.cityRequired ? (
                                    <FormHelperText>
                                        <span className="red">required</span>
                                    </FormHelperText>
                                ) : null}
                            </FormControl>
                            <br />
                            <br />
                            <FormControl className="newaddress-state-form" required>
                                <InputLabel htmlFor="stateIndex">State</InputLabel>
                                <Select
                                    id="stateIndex"
                                    value={this.state.stateIndex}
                                    onChange={this.selectStateIndexHandler}
                                >
                                    <MenuItem value={-1}>{}</MenuItem>
                                    {this.props.statesData ? this.props.statesData.map((s, index) => (
                                        <MenuItem value={index} key={index}>{s.state_name}</MenuItem>
                                    )) : ""}
                                </Select>
                                {this.state.stateIndexRequired ? (
                                    <FormHelperText>
                                        <span className="red">required</span>
                                    </FormHelperText>
                                ) : null}
                            </FormControl>
                            <br />
                            <br />
                            <FormControl className="newaddress-pincode-form" required>
                                <InputLabel htmlFor="pincode">Pincode</InputLabel>
                                <Input
                                    id="pincode"
                                    type="text"
                                    value={this.state.pincode}
                                    onChange={this.commonInputChangeHandler}
                                />
                                {this.state.pincodeRequired ? (
                                    <FormHelperText>
                                        <span className="red">required</span>
                                    </FormHelperText>
                                ) : this.state.pincodeValidationFailed ? (
                                    <FormHelperText>
                                        <span className="red">Pincode must contain only numbers and must be 6 digits long</span>
                                    </FormHelperText>
                                ) : null}
                            </FormControl>
                            <br />
                            <br />
                            {this.state.newAddressError ? (
                                <FormHelperText>
                                    <span className="red">
                                        {this.state.newAddressErrorMsg}
                                    </span>
                                </FormHelperText>
                            ) : null}
                        </Container>
                        <CardActions>
                            <Button variant="contained"
                                color="secondary"
                                onClick={this.onNewAddressSubmit}>SAVE ADDRESS</Button>
                        </CardActions>
                    </CardContent>
                </Card>
                <Snackbar open={this.state.newAddressPageFloatingAlert}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    autoHideDuration={6000}
                    onClose={this.closeFloatingAlert}
                    message={this.state.newAddressPageFloatingAlertMsg} />
            </div>
        );
    }
}

export default NewAddress;
