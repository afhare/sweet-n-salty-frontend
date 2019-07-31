import React from 'react';
import './App.css';
import { Route, Redirect, Link, Switch } from 'react-router-dom';
import NewSnackContainer from './containers/NewSnackContainer';
import EditSnackContainer from './containers/EditSnackContainer';
import SnacksContainer from './containers/SnacksContainer';
import Register from './components/Register';
import Login from './components/Login';
import SnackViewContainer from './containers/SnackViewContainer';
import Api from './services/api';
import Navbar from './components/NavBar';
import About from './components/About'

class App extends React.Component {
  constructor(props){
    super(props)
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

    const bodyObj ={
      snack: {
        name:snackMixObj.name,
        description:snackMixObj.description,
        occasion:snackMixObj.occasion,
        ingredients_attributes: snackMixObj.mixes,
        mixes_attributes: snackMixObj.mixes
      }
    }
    Api.newSnack(bodyObj)
    .then(snack => {
      let updatedSnacks = this.state.snacks
      this.setState({snacks: [...updatedSnacks, snack]})
    })
  }
  handleEditFormSubmit = (e,snackMixObj) => {
    e.preventDefault();
    snackMixObj.mixes.forEach((mix)=>{
       mix.type_of_ingredient = mix.type
    })

    const ingredientsAttributes = snackMixObj.mixes.map(mix => {
      return {
        amount: mix.amount,
        name: mix.ingredient ? mix.ingredient.name : mix.name,
        ["type_of_ingredient"]: mix["type_of_ingredient"]
      }
    })

    const bodyObj ={
      snack: {
        name:snackMixObj.name,
        description:snackMixObj.description,
        occasion:snackMixObj.occasion,
        ingredients_attributes: ingredientsAttributes,
        mixes_attributes: snackMixObj.mixes
      }
    }
    Api.editSnack(bodyObj, snackMixObj.snackId)
    .then(snack => {
      let updatedSnacks = this.state.snacks.filter((oldSnack)=> oldSnack.id !== snack.id )
      this.setState({snacks: [...updatedSnacks, snack]})
    })
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
    this.setState({snack: snack})
  }

  deleteSnack= (snackId)  =>{
    Api.deleteSnack(snackId)
    .then(message => {
      let updatedSnacks = this.state.snacks.filter((oldSnack)=> oldSnack.id !== snackId )

      this.setState({snacks: updatedSnacks})
    })
    return true;
  }

  getUser = (user) =>{
    localStorage.setItem('user', user.jwt)
    this.setState({user})
  }
  logoutUser = () =>{
    this.setState({user:undefined})
    localStorage.removeItem("user")

  }
  componentDidMount(){
      this.getIngredients()
      this.getSnacks()
  }

  render(){
    return (
      <div className="App">
      {localStorage.getItem("user") ? <Navbar user={this.state.user} handleLogout={() => this.logoutUser()}/>  :<Redirect to='/login' />}

        <Switch>
          <Route exact path='/' component={About}/>
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
              return <SnackViewContainer {...routeProps} snack={this.state.snack} deleteSnack={this.deleteSnack} getSnack={this.getSnack}/>
            }} />

          <Route exact path="/snacks/:id/edit" render={(routeProps) => {
              return <EditSnackContainer {...routeProps} snack={this.state.snack} handleEditFormSubmit={this.handleEditFormSubmit}  saltyIngredients={this.state.saltyIngredients} sweetIngredients={this.state.sweetIngredients}
              getSnack={this.getSnack}
              />
            }} />
        </Switch>
      </div>
    );
  }
}

export default App;
