import React, { FC, ChangeEvent, FormEvent, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Button2 from "../Button/Button";
import Form from "../Form/Form";
import Fileupload from "../Fileupload/Fileupload";
import { connect, useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ["Select the option", "Please fill up the form", "Create an ad"];
}

const HorizontalLinearStepper = (props) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [csvObj, setCsvObj] = useState("");
  const [formData, setFormData] = React.useState("");
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();
  const dispatch = useDispatch();

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };
  const handleCallback = (data) => {
    handleNext();
  };
  const handleFormData = (data) => {
    console.log("data from form", data);
    setFormData(data.data);
    handleNext();
    console.log("formData", formData);
  };
  const csvData = async (data) => {
    console.log("data from csv", data.data);
    data.data.isDisabled = false;
    await setCsvObj(data.data);
    console.log("csvObj", data.data);
    await props.save(data.data);
    handleNext();
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <Button2 goToNextStep={handleCallback} dataFromCsv={csvData} />;
      case 1:
        return <Form submitData={handleFormData} />;
      case 2:
        return <Fileupload />;
      default:
        return "Unknown step";
    }
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            <div className={classes.instructions}>
              {getStepContent(activeStep)}
            </div>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    state: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
    save: (data) => dispatch({ type: "SAVE_FORM", payload: data }),
    clear: () => dispatch({ type: "CLEAR_FORM" }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HorizontalLinearStepper);
