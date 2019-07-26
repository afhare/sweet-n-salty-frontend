import React from 'react';
import './App.css';
import NewSnackContainer from './containers/NewSnackContainer';

class App extends React.Component {

  handleNewFormSubmit = (e,snackMixObj) => {
    e.preventDefault();
    console.log(snackMixObj)
    // let reqObj = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type':'application/json',
    //     'Accept':'application/json'
    //   },
    //   body: JSON.stringify(snackMixObj)
    // }

    // fetch(URL, reqObj).then(response => response.json()).then(data => console.log(data))
  }
  render(){
    const saltyIngredients = [
      {name: 'peanuts', type: 'salty'},
      {name: 'pepitas', type: 'salty' },
      {name: 'wasabi peas' , type: 'salty'},
      {name: 'pretzels', type: 'salty' },
    ]
  
    const sweetIngredients = [
      {name: 'raisins' , type: 'sweet'},
      {name: 'chocolate chips', type: 'sweet'},
      {name: 'dried cherries', type: 'sweet'},
      {name: 'yogurt covered raisins', type: 'sweet'},
    ]
    return (
      <div className="App">
        <NewSnackContainer saltyIngredients={saltyIngredients} sweetIngredients={sweetIngredients} handleNewFormSubmit={this.handleNewFormSubmit}/>
      </div>
    );
  }
}

export default App;
