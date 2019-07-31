import React from 'react'
import IngredientsContainer from './IngredientsContainer';
import SnackIngredient from '../components/SnackIngredient'

class NewSnackContainer extends React.Component {
    constructor(props){
        super(props)
        this.state={
          mixes: [],
          newIngredients: [],
          name: undefined,
          description: undefined,
          occasion: undefined
        }
    }

    checkAddedIngredients = (ingredient) => {
        return this.state.mixes.includes(ingredient)
    }

    addSnackIngredient = (ingredientObj) => {
        this.setState({
            mixes: [...this.state.mixes, ingredientObj]
        })
    }

    createSnackIngredient = (ingredientObj) => {
        this.setState({
            newIngredients: [...this.state.newIngredients, ingredientObj]
        })
    }

    removeSnackIngredient = (ingredientObj) => {
        const filteredMixes = this.state.mixes.filter((ingredient) => ingredient.name !== ingredientObj.name)
        const filteredNewIngredients = this.state.newIngredients.filter((ingredient) => ingredient.name !== ingredientObj.name)
        this.setState({
            mixes: [...filteredMixes],
            newIngredients: [...filteredNewIngredients]
        })
    }

    renderAddedIngredients = () => {
        return(
            <div>
                <label>Snack Preview:</label>
                <ul className='snack-ingredient'>
                    {this.displayIngredientsInProgress()}
                </ul>
            </div>
        )
    }

    displayIngredientsInProgress = () => {
        return this.state.mixes.map((ingredient) => {
            return <SnackIngredient ingredient={ingredient} key={ingredient.id}/>
        })
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

  handleNewFormSubmit = (e, state) => {
    this.props.handleNewFormSubmit(e, state)
    this.props.history.push("/snacks")
  }
    render(){
        const { mixes } = this.state
        const { saltyIngredients, sweetIngredients,handleNewFormSubmit } = this.props
        return (
            <div className='new-snack-form'>

                <h2>Create a New Snack</h2>
                    {mixes.length > 0 ? this.renderAddedIngredients() : null }
                <form onSubmit={(e) => {this.handleNewFormSubmit(e,this.state)}}>
                    <label>Snack Name:</label><br/>
                    <input required type='text'name='name'onChange={(e) => this.handleInputChange(e)}/><br/>
                    <br/>
                    <label>Snack Description:</label><br/>
                    <textarea required name='description' rows='4' cols='30'onChange={(e) => this.handleInputChange(e)}/><br/>
                    <label>This Snack Is Perfect For:</label><br/>
                    <input required type='text'name='occasion'onChange={(e) => this.handleInputChange(e)}/><br/>
                    <br/>
                    <br/>
                    <hr width='50%' />
                    <br />
                    <IngredientsContainer checked={(ingredient) => this.checkAddedIngredients(ingredient)} saltyIngredients={saltyIngredients} sweetIngredients={sweetIngredients} addSnackIngredient={ this.addSnackIngredient} removeSnackIngredient={ this.removeSnackIngredient} createSnackIngredient={(ingredientObj)=>this.createSnackIngredient(ingredientObj)}/>
                    <br />
                    <input type='submit'/>
                    <br/>
                    <br/>
                    <br/>
                </form>
            </div>
        )
    }
}

export default NewSnackContainer
