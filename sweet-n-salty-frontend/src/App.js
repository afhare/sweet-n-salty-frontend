import React from 'react';
import './App.css';
import NewSnackContainer from './containers/NewSnackContainer';

function App() {
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
      <NewSnackContainer saltyIngredients={saltyIngredients} sweetIngredients={sweetIngredients} />
    </div>
  );
}

export default App;
