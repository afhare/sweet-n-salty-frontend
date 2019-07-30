import React from 'react'
import IngredientsContainer from './IngredientsContainer';
import SnackIngredient from '../components/SnackIngredient'

class EditSnackContainer extends React.Component {
    constructor(props){
        super(props)
        this.state={
          snackId: props.snack.id,
          newIngredients: [],
          mixes: props.snack.mixes,
          mixIngredients: [],
          name: props.snack.name,
          description: props.snack.description,
          occasion: props.snack.occasion
        }
    }

    checkAddedIngredients = (ingredientName) => {
        let ingredients = this.props.snack.mixes.map(snackIngredient => snackIngredient.ingredient.name)
        return ingredients.includes(ingredientName)
    }

    addSnackIngredient = (ingredientObj) => {
        let currentIngredients = this.state.mixes.map(mix => mix.ingredient.name)
        if (currentIngredients.includes(ingredientObj.name)){
            let index = currentIngredients.indexOf(ingredientObj.name)
            let newMixes = this.state.mixes
            newMixes[index] = ingredientObj
            this.setState({
                mixes: newMixes
            })
        } else {
        this.setState({
            mixes: [...this.state.mixes, ingredientObj]
        })
        }
    }

    removeSnackIngredient = (ingredientObj) => {
        const filteredMixes = this.state.mixes.filter(mix => mix.ingredient.name !== ingredientObj.name)
        const filteredNewIngredients = this.state.newIngredients.filter((ingredient) => ingredient.name !== ingredientObj.name)
        this.setState({
            mixes: [...filteredMixes],
            newIngredients: [...filteredNewIngredients]
        })
    }

    renderAddedIngredients = () => {
        return(
            <div>
                <label>Currently Added Snack Ingredients:</label>
                <ul className='snack-ingredient'>
                    {this.displayIngredientsInProgress()}
                </ul>
            </div>
        )
    }

    displayIngredientsInProgress = () => {
        return this.state.mixes.map((ingredient) => {
            return <SnackIngredient ingredient={ingredient}/>
        })
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleEditFormSubmit = (e, state) => {
      this.props.handleEditFormSubmit(e,state)
      this.props.history.push("/snacks")
    }

    render(){
        const { mixes } = this.state
        const { saltyIngredients, sweetIngredients,handleEditFormSubmit } = this.props
        return (
            <div className='edit-snack-form'>
                <h2>Update Your Snack Mix</h2>
                {mixes.length > 0 ? this.renderAddedIngredients() : null }
                <form onSubmit={(e) => {this.handleEditFormSubmit(e,this.state)}}>
                    <label>Snack Name:</label><br/>
                    <input type='text'name='name'onChange={(e) => this.handleInputChange(e)} value={this.state.name}/><br/>
                    <br/>
                    <label>Snack Description:</label><br/>
                    <textarea name='description' rows='4' cols='30'onChange={(e) => this.handleInputChange(e)} value={this.state.description}/><br/>
                    <label>This Snack Is Perfect For:</label><br/>
                    <input type='text'name='occasion' onChange={(e) => this.handleInputChange(e)} value={this.state.occasion}/><br/>
                    <br/>
                    <br/>
                    <hr width='50%' />
                    <br />
                    <IngredientsContainer checked={this.checkAddedIngredients} amount={()=>this.collectIngredientAmounts()} saltyIngredients={saltyIngredients} sweetIngredients={sweetIngredients} addSnackIngredient={ this.addSnackIngredient} removeSnackIngredient={ this.removeSnackIngredient} createSnackIngredient={(ingredientObj)=>this.createSnackIngredient(ingredientObj)}/>
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

export default EditSnackContainer
