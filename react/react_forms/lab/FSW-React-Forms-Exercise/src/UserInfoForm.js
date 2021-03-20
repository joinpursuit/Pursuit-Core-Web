import React from "react";
import "./UserInfoForm.css";

class UserInfoForm extends React.Component {
  constructor() {
    super();
    this.state = {
      notARobot: false,
      userTitle: "",
      firstName: "",
      lastName: "",
    };
  }

  handleCheckboxChange = (e) => {
    const { checked } = e.target;

    this.setState({
      notARobot: checked,
    });
  };

  handleSelectChange = (e) => {
    const { value } = e.target;
    this.setState({
      userTitle: value,
    });
  };

  handleTextChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  allFieldsValid = () => {
    const { notARobot, userTitle, firstName, lastName } = this.state;
    return notARobot && userTitle && firstName && lastName;
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { notARobot, userTitle, firstName, lastName } = this.state;

    if (this.allFieldsValid()) {
      alert(
        `Form submitted! \n ${notARobot} \n ${userTitle} \n ${firstName} ${lastName}`
      );
    } else {
      alert("Please fill out the form completely");
    }
  };

  render() {
    const { notARobot, userTitle, firstName, lastName } = this.state;

    return (
      <form onSubmit={this.handleFormSubmit} className="form-container">
        <h2>User Information</h2>
        <input
          id="not-robot"
          type="checkbox"
          checked={notARobot}
          onChange={this.handleCheckboxChange}
        />
        <select value={userTitle} onChange={this.handleSelectChange}>
          <option value=""></option>
          <option value="mr">Mr.</option>
          <option value="ms">Ms.</option>
          <option value="mrs">Mrs.</option>
          <option value="mx">Mx.</option>
          <option value="dr">Dr.</option>
        </select>
        <input
          type="text"
          name="firstName"
          value={firstName}
          placeholder="First Name"
          onChange={this.handleTextChange}
        />
        <input
          type="text"
          name="lastName"
          value={lastName}
          placeholder="Last Name"
          onChange={this.handleTextChange}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default UserInfoForm;
