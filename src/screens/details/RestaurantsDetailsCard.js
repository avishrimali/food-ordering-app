import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRupeeSign, faStar } from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        backgroundColor: 'lightgray'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        width: '80%'
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        minWidth: 175,
        width: '20%'
    },
    controls: {
        display: 'flex',
        alignItems: 'left',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    }
}));

export default function RestaurantsDetailsCard(props) {
    const classes = useStyles();
    const { restDetails } = props;

    return (
        <Card className={classes.root} style={{ minWidth: "400px", boxShadow: "none" }}>
            <CardMedia
                className={classes.cover}
                image={restDetails.photo_URL}
                title="Live from space album cover"
            />
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography gutterBottom variant="h4" component="h4">
                        {restDetails.restaurant_name}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="h6">
                        {restDetails.address.locality}
                    </Typography>
                    <Typography variant="body1" color="textPrimary" component="p">
                        {restDetails.categories.map((cat, index) => (
                            cat.category_name + " "
                        ))}
                    </Typography>
                </CardContent>
                <div className={classes.controls}>
                    <Grid container>
                        <Grid item xs={6}>
                            <Typography variant="body1" color="textPrimary" component="p">
                                <FontAwesomeIcon icon={faStar} /> {Math.round(restDetails.customer_rating * 10) / 10}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {"AVERAGE RATING BY"}<br />{restDetails.number_customers_rated + " CUSTOMERS"}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" color="textPrimary" component="p">
                                <FontAwesomeIcon icon={faRupeeSign} />{restDetails.average_price}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {"AVERAGE COST FOR"}<br />{"TWO PEOPLE"}
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </Card>
    );
}
