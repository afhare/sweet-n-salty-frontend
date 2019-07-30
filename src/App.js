import React from 'react';
import './App.css';
import { Route, Redirect } from 'react-router-dom';
import NewSnackContainer from './containers/NewSnackContainer';
import SnacksContainer from './containers/SnacksContainer';
import Register from './components/Register';
import Login from './components/Login';
import SnackViewContainer from './containers/SnackViewContainer';
import Api from './services/api';

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      saltyIngredients: [],
      sweetIngredients: [],
      snack: undefined,
      snacks:[],
      user: undefined
    }
  }

  handleNewFormSubmit = (e,snackMixObj) => {
    e.preventDefault();
    snackMixObj.mixes.forEach((mix)=>{
       mix.type_of_ingredient = mix.type
    })
    const bodyObj = {
      name:snackMixObj.name,
      description:snackMixObj.description,
      occasion:snackMixObj.occasion,
      user_id:1,
      ingredients_attributes: snackMixObj.mixes,
      mixes_attributes: snackMixObj.mixes,
    }

    Api.newSnack(bodyObj)
    .then(data => console.log(data))
  }
  getSnacks = () => {
    Api.fetchSnacks()
    .then(snacks => this.setState({snacks}))
  }
  getIngredients= () =>{
    Api.fetchIngredients()
    .then(ingredients => {
      const saltyIngredients = ingredients.filter((ingredient) => ingredient.type_of_ingredient === "salty")

      const sweetIngredients = ingredients.filter((ingredient) => ingredient.type_of_ingredient === "sweet")

      this.setState({saltyIngredients, sweetIngredients})
    })
  }
  getSnack = (snack)=>{
    // Api.getSnack(snackId)
    // .then((snack) => {
    //   this.setState({snack})
    //  // return <Redirect to={`/snacks/${snackId}`}/>
    // })
    this.setState({snack}, console.log(this.state.snack))
  }

  getUser = (user) =>{
    localStorage.setItem('user', user.jwt)
    this.setState({user})
    console.log(localStorage.getItem("user"))
  }
  logoutUser = () =>{
    this.setState({user:undefined})
    localStorage.removeItem("user")
  }
  componentDidMount(){
      this.getIngredients()
  }

  render(){

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
        <button onClick={this.logoutUser}> Log Out</button>
        {localStorage.getItem("user") ?  <Redirect to='/snacks' /> :<Redirect to='/login' />}

        <Route exact path="/login" render={(routeProps) => {
            return <Login {...routeProps} getUser={this.getUser}/>
          }} />

        <Route exact path="/register" render={(routeProps) => {
            return <Register {...routeProps} getUser={this.getUser}/>
          }} />

        <Route exact path="/new_snack" render={(routeProps) => {
            return <NewSnackContainer {...routeProps} saltyIngredients={this.state.saltyIngredients} sweetIngredients={this.state.sweetIngredients} handleNewFormSubmit={this.handleNewFormSubmit}/>
          }} />

        <Route exact path="/snacks" render={(routeProps) => {
            return <SnacksContainer {...routeProps}  getSnacks={this.getSnacks} snacks={this.state.snacks} getSnack={this.getSnack} />
          }} />

        <Route exact path="/snacks/:id" render={(routeProps) => {
            return <SnackViewContainer {...routeProps} snack={this.state.snack}/>
          }} />
      </div>
    );
  }
}
// <Route exact path="/snacks/:id" render={(routeProps) => {
//     return <SnackViewContainer {...routeProps} snack={this.state.snack}/>
//   }} />
// <SnackViewContainer snack={snack}/>
export default App;
//  getSnack={this.getSnack}
// snack={this.state.snack}
