import React from 'react';
import './App.css';
import NewSnackContainer from './containers/NewSnackContainer';
import SnackViewContainer from './containers/SnackViewContainer';

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      saltyIngredients: [],
      sweetIngredients: []
    }
  }

  handleNewFormSubmit = (e,snackMixObj) => {
    e.preventDefault();
    // console.log(snackMixObj)
    snackMixObj.mixes.forEach((mix)=>{
       mix.type_of_ingredient = mix.type
    })
    // console.log(ingredientsAttributes);
    const bodyObj = {
      name:snackMixObj.name,
      description:snackMixObj.description,
      occasion:snackMixObj.occasion,
      user_id:1,
      ingredients_attributes: snackMixObj.mixes,
      mixes_attributes: snackMixObj.mixes,
    }

    let reqObj = {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      body: JSON.stringify(bodyObj)
    }

    fetch("http://localhost:3000/snacks", reqObj).then(response => response.json()).then(data => console.log(data))
  }

  fetchIngredients= () =>{
    fetch("http://localhost:3000/ingredients")
    .then(resp => resp.json())
    .then(ingredients => {
      const saltyIngredients = ingredients.filter((ingredient) => ingredient.type_of_ingredient === "salty")

      const sweetIngredients = ingredients.filter((ingredient) => ingredient.type_of_ingredient === "sweet")

      this.setState({saltyIngredients, sweetIngredients})
    })
  }
  componentDidMount(){
    this.fetchIngredients()
  }

  render(){
    // const saltyIngredients = [
    //   {name: 'peanuts', type: 'salty'},
    //   {name: 'pepitas', type: 'salty' },
    //   {name: 'wasabi peas' , type: 'salty'},
    //   {name: 'pretzels', type: 'salty' },
    // ]
    //
    // const sweetIngredients = [
    //   {name: 'raisins' , type: 'sweet'},
    //   {name: 'chocolate chips', type: 'sweet'},
    //   {name: 'dried cherries', type: 'sweet'},
    //   {name: 'yogurt covered raisins', type: 'sweet'},
    // ]

    const snack = {
      "id": 1,
      "name": "Flavor Logs",
      "description": "Scrumptious log of a very wide variety of ingredients that help encapsulate the flavors that lie within",
      "occasion": "Couch Surfing",
      "user": {
        "id": 2,
        "username": "JoshsJonsingTreats",
        "name": "Josh"
      },
      "mixes": [
        {
          "id": 1,
          "amount": "1 cup",
          "ingredient": {
            "id": 16,
            "name": "dried apricots",
            "type_of_ingredient": "sweet"
          }
        },
        {
          "id": 2,
          "amount": "1 cup",
          "ingredient": {
            "id": 15,
            "name": "raisins",
            "type_of_ingredient": "sweet"
          }
        },
        {
          "id": 3,
          "amount": "3/4 cup",
          "ingredient": {
            "id": 8,
            "name": "wasabi peas",
            "type_of_ingredient": "salty"
          }
        },
        {
          "id": 4,
          "amount": "3/4 cup",
          "ingredient": {
            "id": 26,
            "name": "chocolate covered peanuts",
            "type_of_ingredient": "sweet"
          }
        },
        {
          "id": 5,
          "amount": "1 cup",
          "ingredient": {
            "id": 4,
            "name": "roasted cashews",
            "type_of_ingredient": "salty"
          }
        },
        {
          "id": 6,
          "amount": "1/4 cup",
          "ingredient": {
            "id": 8,
            "name": "wasabi peas",
            "type_of_ingredient": "salty"
          }
        }
      ]
    }

    return (
      <div className="App">

        <SnackViewContainer snack={snack}/>
        <NewSnackContainer saltyIngredients={this.state.saltyIngredients} sweetIngredients={this.state.sweetIngredients} handleNewFormSubmit={this.handleNewFormSubmit}/>
      </div>
    );
  }
}

export default App;
