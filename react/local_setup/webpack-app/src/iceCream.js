import React, { Component } from "react";

class IceCream extends React.Component {
  constructor() {
    super();

    this.state = {
      likesIceCream: ""
    };
  }

  handleLikesIceCream = e => {
    this.setState({
      likesIceCream: e.target.value
    });
  };

  render() {
    const { likesIceCream } = this.state;
    let message = "";

    if (likesIceCream === "yes") {
      message = "Great!";
    } else if (likesIceCream === "no") {
      message = "Go home.";
    }

    return (
      <div className="App">
        <div>
          Do you like ice cream?
          <select value={likesIceCream} onChange={this.handleLikesIceCream}>
            <option value="" />
            <option value="yes">Yes!</option>
            <option value="no">Nope</option>
          </select>
        </div>
        <div>{message}</div>
      </div>
    );
  }
}

export default IceCream;
