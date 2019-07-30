import React from 'react';
import { Link } from 'react-router-dom';

class Snack extends React.Component {
  log = () =>{
    this.props.changeHistory(this.props.snack)
  }
  render(){
    return(
      <div className="snack">
        <h2>{this.props.snack.name}</h2>
        <p>By: {this.props.snack.user.username}</p>
        <p>Description: {this.props.snack.description}</p>
        <p>Occasion: {this.props.snack.occasion}</p>
        <button onClick={this.log}>See More</button>
      </div>
    )
  }
}

export default Snack;



// <button onClick={() => this.props.getSnack(this.props.snack)}>See More</button>
