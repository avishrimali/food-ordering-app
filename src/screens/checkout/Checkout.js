import React, { Component } from 'react';
import CheckoutSteps from "./CheckoutSteps";
import Grid from "@material-ui/core/Grid";
import OrderSummary from "./OrderSummary";
import Header from "../../common/header/Header";
import Snackbar from '@material-ui/core/Snackbar';

class Checkout extends Component {
    constructor() {
        super();
        this.state = {
            restaurantName: null,
            restaurantId: null,
            cart: null,
            customerAddressData: [],
            paymentMethodsData: [],
            statesData: [],
            selectedAddress: null,
            selectedPayment: null,
            selectedRestaurant: null,
            cuponData: null,
            orderBillTotal: 0,
            discountAmount: 0,
            error: false,
            erorCode: null,
            errorMsg: null,
            checkOutPageFloatingAlert: false,
            checkOutPageFloatingAlertMsg: "",
        };
    }

    componentDidMount() {
        const { cart, restaurantId, restaurantName } = this.props.history.location.state;
        var orderTotal = cart.reduce((acc, next) => acc + (next.item.price * next.qty), 0);
        this.setState({
            restaurantName: restaurantName,
            selectedRestaurant: restaurantId,
            cart: cart,
            orderBillTotal: orderTotal
        });
        this.getCustomerAddressData();
        this.getPaymentModeData();
        this.getStateData();
    }
    // fetch custome address data
    getCustomerAddressData = () => {

        var url = this.props.baseUrl + "/address/customer";

        fetch(
            url,
            {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json;charset=UTF-8',
                    'authorization': 'Bearer ' + sessionStorage.getItem("access-token")
                }
            }
        ).then((response) => {
            if (response.status === 200) {
                response.json().then((json) => {
                    this.setState({ customerAddressData: json.addresses });
                })
            } else {
                response.json().then((json) => {
                    this.setState({
                        error: true,
                        erorCode: json.code,
                        errorMsg: json.message
                    });
                })
            }
        }, error => {
            this.setState({
                error: true,
                erorCode: error.code,
                errorMsg: "Error while making request to FoodOrderingApp Backend"
            });
        })
    }
    // fetch available coupn
    getCuponData = (cuponText) => {

        var url = this.props.baseUrl + "/order/coupon/" + cuponText;

        fetch(
            url,
            {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json;charset=UTF-8',
                    'authorization': 'Bearer ' + sessionStorage.getItem("access-token")
                }
            }
        ).then((response) => {
            if (response.status === 200) {
                response.json().then((json) => {
                    this.setState({ cuponData: json });
                })
            } else {
                response.json().then((json) => {
                    this.setState({
                        error: true,
                        erorCode: json.code,
                        errorMsg: json.message
                    });
                })
            }
        }, error => {
            this.setState({
                error: true,
                erorCode: error.code,
                errorMsg: "Error while making request to FoodOrderingApp Backend"
            });
        })
    }
    // fetch payment mode data
    getPaymentModeData = () => {

        var url = this.props.baseUrl + "/payment";

        fetch(
            url,
            {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json;charset=UTF-8'
                }
            }
        ).then((response) => {
            if (response.status === 200) {
                response.json().then((json) => {
                    this.setState({ paymentMethodsData: json.paymentMethods });
                })
            } else {
                response.json().then((json) => {
                    this.setState({
                        error: true,
                        erorCode: json.code,
                        errorMsg: json.message
                    });
                })
            }
        }, error => {
            this.setState({
                error: true,
                erorCode: error.code,
                errorMsg: "Error while making request to FoodOrderingApp Backend"
            });
        })
    }

    getStateData = () => {

        var url = this.props.baseUrl + "/states";

        fetch(
            url,
            {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json;charset=UTF-8'
                }
            }
        ).then((response) => {
            if (response.status === 200) {
                response.json().then((json) => {
                    this.setState({ statesData: json.states });
                })
            } else {
                response.json().then((json) => {
                    this.setState({
                        error: true,
                        erorCode: json.code,
                        errorMsg: json.message
                    });
                })
            }
        }, error => {
            this.setState({
                error: true,
                erorCode: error.code,
                errorMsg: "Error while making request to FoodOrderingApp Backend"
            });
        })
    }

    // place the order after discount
    onPlaceOrderCallback = (discountAmount) => {

        var orderItem = [];
        for (var i = 0; i < this.state.cart.length; i++) {
            orderItem.push({
                "item_id": this.state.cart[i].item.id,
                "price": this.state.cart[i].item.price,
                "quantity": this.state.cart[i].qty
            });
        }
        var url = this.props.baseUrl + "/order";

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
                    "address_id": this.state.selectedAddress,
                    "bill": this.state.orderBillTotal,
                    "coupon_id": this.state.cuponData && this.state.cuponData.id ? this.state.cuponData.id : "",
                    "discount": discountAmount,
                    "item_quantities": orderItem,
                    "payment_id": this.state.selectedPayment,
                    "restaurant_id": this.state.selectedRestaurant
                })
            }
        ).then((response) => {
            if (response.status === 201) {
                response.json().then((json) => {
                    this.setState({
                        checkOutPageFloatingAlert: true,
                        checkOutPageFloatingAlertMsg: "Order placed successfully! Your order ID is " + json.id
                    });
                })
            } else {
                response.json().then((json) => {
                    this.setState({
                        error: true,
                        erorCode: json.code,
                        errorMsg: json.message,
                        checkOutPageFloatingAlert: true,
                        checkOutPageFloatingAlertMsg: "Unable to place your order! Please try again!"
                    });
                })
            }
        }, error => {
            this.setState({
                error: true,
                erorCode: error.code,
                errorMsg: "Error while making request to FoodOrderingApp Backend",
                checkOutPageFloatingAlert: true,
                checkOutPageFloatingAlertMsg: "Unable to place your order! Please try again!"
            });
        })
    }
    // set selected address Id
    selectedAddressIdCallback = (addressId) => {
        this.setState({
            selectedAddress: addressId
        });
    }
    // set selected payment Id
    selectedPaymentIdCallback = (paymentId) => {
        this.setState({
            selectedPayment: paymentId
        });
    }

    // fetch coupon data
    selectedCuponTextCallback = (cuponText) => {
        this.getCuponData(cuponText);
    }

    closeFloatingAlert = () => {
        this.setState({
            checkOutPageFloatingAlert: false,
            checkOutPageFloatingAlertMsg: ""
        });
    }

    render() {
        return (
            <div>
                <Header {...this.props} showSearchBar={false} />
                <Grid container spacing={3}>
                    <Grid item xs={9} style={{ minWidth: "400px" }}>
                        <CheckoutSteps {...this.props}
                            customerAddressData={this.state.customerAddressData}
                            paymentMethodsData={this.state.paymentMethodsData}
                            statesData={this.state.statesData}
                            selectedAddressIdCallback={this.selectedAddressIdCallback}
                            selectedPaymentIdCallback={this.selectedPaymentIdCallback}
                            newAddressAddedCallBack={this.getCustomerAddressData}
                        />
                    </Grid>
                    <Grid item xs={3} style={{ padding: '36px', minWidth: "400px" }}>
                        <OrderSummary {...this.props}
                            cart={this.state.cart}
                            restaurantId={this.state.restaurantId}
                            restaurantName={this.state.restaurantName}
                            selectedCuponTextCallback={this.selectedCuponTextCallback}
                            discount={this.state.cuponData && this.state.cuponData.percent ? this.state.cuponData.percent : 0}
                            onPlaceOrderCallback={this.onPlaceOrderCallback}
                            orderBillTotal={this.state.orderBillTotal}
                        />
                    </Grid>
                </Grid>
                <Snackbar open={this.state.checkOutPageFloatingAlert}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    autoHideDuration={6000}
                    onClose={this.closeFloatingAlert}
                    message={this.state.checkOutPageFloatingAlertMsg} />
            </div>
        );
    }
}

export default Checkout;
