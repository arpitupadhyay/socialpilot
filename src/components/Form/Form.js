import React, { Component } from "react";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      bedroom: '',
      bathroom: '',
      description: '',
      isDisabled: true,
    };
    this.handleAddress = this.handleAddress.bind(this);
    this.handleBedroom = this.handleBedroom.bind(this);
    this.handleBathroom = this.handleBathroom.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  async handleAddress(event) {
    await this.setState({
      address: event.target.value,
    });
    this.checkValidation();
  }
  async handleBedroom(event) {
    await this.setState({
      bedroom: event.target.value,
    });
    this.checkValidation();
  }
  async handleBathroom(event) {
    await this.setState({
      bathroom: event.target.value,
    });
    this.checkValidation();
  }
  async handleDescription(event) {
    await this.setState({
      description: event.target.value,
    });
    this.checkValidation();
  }

  checkValidation() {
    const data = this.state;
    if (data.address && data.bedroom && data.bathroom) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  submitForm() {
    this.props.submitData({data: this.state});
  }

  render() {
    return (
      <form className="container">
        <h3>Add a Property Form</h3>

        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            value={this.state.address}
            onChange={this.handleAddress}
            name="Address"
            className="form-control"
            placeholder="Enter Address"
          />
        </div>

        <div className="form-group">
          <label>Bedroom</label>
          <input
            type="number"
            min="1"
            max="10"
            name="bedroom"
            value={this.state.bedroom}
            onChange={this.handleBedroom}
            className="form-control"
            placeholder="Enter Bedroom"
          />
        </div>

        <div className="form-group">
          <label>Bathroom</label>
          <input
            type="number"
            className="form-control"
            value={this.state.bathroom}
            onChange={this.handleBathroom}
            placeholder="Enter Bathroom"
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            className="form-control"
            value={this.state.description}
            onChange={this.handleDescription}
            placeholder="Enter Description (Optional)"
          />
        </div>

        <button
          type="button"
          disabled={this.state.isDisabled}
          onClick={this.submitForm}
          className="btn btn-primary btn-block"
        >
          Submit
        </button>
      </form>
    );
  }
}

export default Form;
