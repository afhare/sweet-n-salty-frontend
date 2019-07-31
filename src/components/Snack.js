import React from 'react';
import { Link } from 'react-router-dom';

class Snack extends React.Component {
  render(){
    return(
      <div className="snack">
        <h2>{this.props.snack.name}</h2>
        <p>By: {this.props.snack.user.username}</p>
        <p>Description: {this.props.snack.description}</p>
        <p className="last-child">Occasion: {this.props.snack.occasion}</p>
        <Link className="fake-button" to={{pathname:`/snacks/${this.props.snack.id}`, snack: this.props.snack }}> See More</Link>
      </div>
    )
  }
}

export default Snack;

// <button onClick={this.log}>See More</button>
// log = () =>{
  //   this.props.changeHistory(this.props.snack)
  // }


// <button onClick={() => this.props.getSnack(this.props.snack)}>See More</button>
