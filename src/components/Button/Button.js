import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { CSVReader } from "react-papaparse";

const buttonRef = React.createRef();

class Button2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }
  handleOpenDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };

  handleOnFileLoad = (data) => {
    console.log("---------------------------");
    // console.log(data);
    this.validateCSV(data[0].data);
    console.log("---------------------------");
  };

  validateCSV = (data) => {
    if (!data.address) {
      console.log("address is empty");
      return;
    }
    if (!data.bedroom || isNaN(data.bedroom) || data.bedroom.length > 10) {
      console.log("value for bedroom should be correct");
      return;
    }
    if (!data.bathroom || isNaN(data.bathroom) || data.bathroom.length > 10) {
      console.log("value for bathroom should be correct");
      return;
    }
    //logic for set state
    data.bedroom = parseInt(data.bedroom, 10)
    data.bathroom = parseInt(data.bathroom, 10)
    this.setState({ data: {} }); //deleting the data in state to make sure that the data from csv is upto date everytime
    this.setState({ data: data });
    this.props.dataFromCsv({data: this.state.data});
  };
  handleOnError = (err, file, inputElem, reason) => {
    console.log("---------------------------");
    console.log(err);
    console.log("---------------------------");
  };

  handleOnRemoveFile = (data) => {
    console.log("---------------------------");
    console.log(data);
    console.log("---------------------------");
  };

  handleRemoveFile = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.removeFile(e);
    }
  };

  fromScratch() {
    alert("hello");
  }
  render() {
    return (
      <div className="container">
        <Button
          onClick={() => {
            // alert("Go to step 2");
            this.props.goToNextStep("move to step 2");
          }}
          variant="outlined"
          color="primary"
          className="mb-2"
        >
          Add from scratch
        </Button>
        <br />
        <CSVReader
          ref={buttonRef}
          onFileLoad={this.handleOnFileLoad}
          onError={this.handleOnError}
          onRemoveFile={this.handleOnRemoveFile}
          noClick
          noDrag
          config={{ header: true }}
        >
          {({ file }) => (
            <aside>
              <Button
                variant="outlined"
                color="primary"
                ref={buttonRef}
                className="mb-2"
                onClick={this.handleOpenDialog}
                startIcon={<CloudUploadIcon />}
              >
                Upload
              </Button>
              {/* <button
                type="button"
                onClick={this.handleOpenDialog}
                style={{
                  borderRadius: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  width: "40%",
                  paddingLeft: 0,
                  paddingRight: 0,
                }}
              >
                Browse file
              </button>
              <div
                style={{
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: "#ccc",
                  height: 45,
                  lineHeight: 2.5,
                  marginTop: 5,
                  marginBottom: 5,
                  paddingLeft: 13,
                  paddingTop: 3,
                  width: "60%",
                }}
              >
                {file && file.name}
              </div>
              <button
                style={{
                  borderRadius: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  paddingLeft: 20,
                  paddingRight: 20,
                }}
                onClick={this.handleRemoveFile}
              >
                Remove
              </button> */}
            </aside>
          )}
        </CSVReader>
      </div>
    );
  }
}

export default Button2;
