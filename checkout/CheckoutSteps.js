import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import SelectAddress from "./SelectAddress";
import Payment from "./Payment";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  actionsContainer: {
    marginBottom: theme.spacing(2)
  },
  resetContainer: {
    padding: theme.spacing(3)
  }
}));

function getSteps() {
  return ["Delivery", "Payment"];
}




export default function CheckoutSteps(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [addressId, setAddressId] = React.useState();
  const [paymentId, setPaymentId] = React.useState();
  const steps = getSteps();
  // set selected address Id
  const setSelectedAddressId = (newValue) => {
    setAddressId(newValue);
  };
  // set selected payment Id
  const setSelectedPaymentId = (id) => {
    setPaymentId(id);
  };
  // render steps for wizard
  function getStepContent(step, props) {
    switch (step) {
      case 0:
        return <SelectAddress selectedAddressId={setSelectedAddressId} {...props} />;
      case 1:
        return <Payment selectedPaymentId={setSelectedPaymentId} {...props} />;
      default:
        return "Unknown step";
    }
  }
  // handle wizard next
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };
  // handle wizard back
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };
  // set initial wizard step
  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div>
      <div className={classes.root}>

        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                <Typography component="div">{getStepContent(index, props)}</Typography>
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                    >
                      Back
                  </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      disabled={(activeStep !== steps.length - 1 && !addressId) || (activeStep === steps.length - 1 && !paymentId)}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>View the Summary &amp; place your order now!</Typography>
            <Button onClick={handleReset} className={classes.button}>
              CHANGE
          </Button>
          </Paper>
        )}
      </div></div>
  );
}
