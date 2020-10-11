import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const useStyles = makeStyles({
    root: {
        width: '25%',
        display: 'inline-block',
        minWidth: '110px',
        margin: '0.2rem'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function ExistingAddress(props) {
    const classes = useStyles();
    const [selected, setSelected] = useState("");
    // set selected address id
    function selectTheAddress(e) {
        setSelected(e.currentTarget.id);
        props.selectedAddressIdCallback(e.currentTarget.id)
        props.selectedAddressId(e.currentTarget.id)
    }

    return (
        <div>
            {props.customerAddressData ?
                props.customerAddressData.map((addrObj, index) => (
                    <Card className={classes.root} key={index}
                        style={selected === addrObj.id ? {
                            borderColor: 'red',
                            borderStyle: 'outset',
                            borderLeftWidth: '0.1em',
                            borderTopWidth: '0.1em',
                            borderRadius: '10'
                        } : {}}
                    >
                        <CardContent>
                            <Typography className={classes.pos} color="textPrimary">
                                {addrObj.flat_building_name}
                            </Typography>
                            <Typography className={classes.pos} color="textPrimary">
                                {addrObj.locality}
                            </Typography>
                            <Typography className={classes.pos} color="textPrimary">
                                {addrObj.city}
                            </Typography>
                            <Typography className={classes.pos} color="textPrimary">
                                {addrObj.state.state_name}
                            </Typography>
                            <Typography className={classes.pos} color="textPrimary">
                                {addrObj.pincode}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button id={addrObj.id} size="large" onClick={selectTheAddress}><CheckCircleIcon style={selected === addrObj.id ? { fill: "green" } : { fill: "gray" }} /></Button>
                        </CardActions>
                    </Card>))
                : ""}
        </div>
    );
}
