import React from 'react'
import IngredientsContainer from './IngredientsContainer';
import SnackIngredient from '../components/SnackIngredient'

class NewSnackContainer extends React.Component {
    constructor(props){
        super(props)
        this.state={
          mixes: [],
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
        //pass the name and type obj up to App to post new ingredient
    }
    
    removeSnackIngredient = (ingredientObj) => {
        const filteredMixes = this.state.snackIngredients.filter((ingredient) => ingredient.name !== ingredientObj.name)
        this.setState({
            mixes: [...filteredMixes]
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


    render(){
        const { mixes } = this.state
        const { saltyIngredients, sweetIngredients,handleNewFormSubmit } = this.props
        return (
            <div className='new-snack-form'>
                <h2>Create a New Snack</h2>
                    {mixes.length > 0 ? this.renderAddedIngredients() : null }
                <form onSubmit={(e) => {handleNewFormSubmit(e,this.state)}}>
                    <label>Snack Name:</label><br/>
                    <input type='text'name='name'onChange={(e) => this.handleInputChange(e)}/><br/>
                    <br/>
                    <label>Snack Description:</label><br/>
                    <textarea name='description' rows='4' cols='30'onChange={(e) => this.handleInputChange(e)}/><br/>
                    <label>This Snack Is Perfect For:</label><br/>
                    <input type='text'name='occasion'onChange={(e) => this.handleInputChange(e)}/><br/>
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