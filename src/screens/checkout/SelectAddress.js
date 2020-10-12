import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ExistingAddress from "./ExistingAddress";
import NewAddress from "./NewAddress";

class TabPanel extends Component {
    render() {
        const { children, value, index, ...other } = this.props;

        return (
            <Typography
                component="span"
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && <Box p={2}>{children}</Box>}
            </Typography>
        );
    }
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));
// if there is not address added
export const ExistingAddressNotFound = () => <span>There are no saved addresses! You can save an address using the 'New Address' tab or using your ‘Profile’ menu option.</span>;

export default function SelectAddress(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    // handle change in address selection
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    // set selected address Id
    const setSelectedAddressId = (newValue) => {
        props.setSelectedAddressId(newValue);
    };

    return (
        <div className={classes.root} >
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} >
                    <Tab label="Existing Address" {...a11yProps(0)} />
                    <Tab label="New Address" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                {props.customerAddressData && props.customerAddressData.length > 0 ? <ExistingAddress selectedAddressId={setSelectedAddressId}{...props} /> : <ExistingAddressNotFound />}
            </TabPanel>
            <TabPanel value={value} index={1}>
                <NewAddress {...props} />
            </TabPanel>
        </div>
    );
}
