import React from 'react';
import Snack from '../components/Snack'

class SnacksContainer extends React.Component {
  changeHistory = (snack) => {
    this.props.history.push(`/snacks/${snack.id}`);
    this.props.getSnack(snack)
  }
  displaySnacks = ()=>{
    // console.log(this.props.snacks);
    return this.props.snacks.map((snack) => <Snack snack={snack} key={snack.id} changeHistory={this.changeHistory}/>)
  }
  componentDidMount(){
    // this.props.getSnacks()
  }

  render(){
    return(
      <div className="snacks">
        {this.displaySnacks()}
      </div>
    )
  }
}

export default SnacksContainer;
