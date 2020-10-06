import React, { useState } from 'react';
import "./MyCart.css";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { List, ListItem, ListItemText, ListItemAvatar, Badge } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRupeeSign, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { faStopCircle } from '@fortawesome/free-regular-svg-icons'
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
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

export default function MyCart(props) {
  const classes = useStyles();
  const [cartFloatingAlert, setCartFloatingAlert] = useState(false);
  const [cartFloatingAlertMsg, setCartFloatingAlertMsg] = useState("");
  let cart = props.cart;

 
  function checkoutHandler(e) {
    var totalQty = cart.reduce((acc, next) => acc + next.qty, 0);
    if (totalQty > 0) {
      if (sessionStorage.getItem("access-token") == null) {
        setCartFloatingAlertMsg("Please login first!")
        setCartFloatingAlert(true);
        return;
      }

      props.history.push({
        pathname: '/checkout',
        state: {
          cart: cart.filter(item => item.qty > 0),
          restaurantId: props.restaurantDetails.id,
          restaurantName: props.restaurantDetails.restaurant_name
        }
      })
    } else {
      setCartFloatingAlertMsg("Please add an item to your cart!")
      setCartFloatingAlert(true);
      return;
    }
  }

  function closeCartFloatingAlert() {
    setCartFloatingAlert(false);
    setCartFloatingAlertMsg("");
  }
  return (
    <div style={{ marginTop: '2rem' }}>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Badge badgeContent={cart.reduce((acc, next) => acc + next.qty, 0)} color="primary">
            <ShoppingCartIcon />
          </Badge>
          <Typography variant="h5" component="div">
            My Cart
          </Typography>
          <List>
            {cart && cart.length > 0 ? cart.map((cartItem, index) => (
              <ListItem key={index}>
                <ListItemAvatar>
                  <FontAwesomeIcon icon={faStopCircle} color={cartItem.item.item_type === "VEG" ? "green" : "red"} />
                </ListItemAvatar>
                <ListItemText style={{ width: '30%' }} color="textSecondary" >{cartItem.item.item_name[0].toUpperCase() + cartItem.item.item_name.slice(1)}</ListItemText>
                <ListItemText>
                  <Typography variant="body1" color="textPrimary">
                    <FontAwesomeIcon icon={faMinus} onClick={() => props.decQty(index)} />
                    {" " + cartItem.qty + " "}
                    <FontAwesomeIcon icon={faPlus} onClick={() => props.incQty(index)} />
                  </Typography>
                </ListItemText>
                <ListItemText>
                  <Typography variant="body1" color="textSecondary"><FontAwesomeIcon icon={faRupeeSign} />{cartItem.item.price * cartItem.qty}</Typography>
                </ListItemText>
              </ListItem>)) : " "
            }
            <ListItem>
              <ListItemText style={{ width: '60%' }}>
                <Typography variant="body1" color="textPrimary">TOTAL AMOUNT</Typography>
              </ListItemText>
              <ListItemText>
                <Typography variant="body1" color="textPrimary"><FontAwesomeIcon icon={faRupeeSign} />
                  {cart && cart.length > 0 ? cart.reduce((prev, next) => (prev + (next.item.price * next.qty)), 0) : "0"}
                </Typography>
              </ListItemText>
            </ListItem>
          </List>
        </CardContent>
        <CardActions>
          <Button variant="contained" fullWidth={true} color="primary" onClick={checkoutHandler} >CHECKOUT</Button>
        </CardActions>
      </Card>
      <Snackbar open={cartFloatingAlert}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        autoHideDuration={6000}
        onClose={closeCartFloatingAlert}
        message={cartFloatingAlertMsg} />
    </div>
  );
}
