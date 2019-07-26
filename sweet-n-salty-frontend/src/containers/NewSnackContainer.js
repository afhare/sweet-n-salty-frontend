import React from 'react'
import IngredientsContainer from './IngredientsContainer';
import SnackIngredient from '../components/SnackIngredient'

class NewSnackContainer extends React.Component {
    constructor(props){
        super(props)
        this.state={
          snackIngredients: [],
          snackName: undefined,
          snackDescription: undefined  
        }
    }

    checkAddedIngredients = (ingredient) => {
        return this.state.snackIngredients.includes(ingredient)
    }

    addSnackIngredient = (ingredientObj) => {
        debugger;
        this.setState({
            snackIngredients: [...this.state.snackIngredients, ingredientObj]
        })
    }
    
    removeSnackIngredient = (ingredientObj) => {
        const filteredSnackIngredients = this.state.snackIngredients.filter((ingredient) => ingredient.name !== ingredientObj.name)
        this.setState({
            snackIngredients: [...filteredSnackIngredients]
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
        return this.state.snackIngredients.map((ingredient) => {
            return <SnackIngredient ingredient={ingredient}/>
        })
    }

    handleInputChange = (e) => {
        // this.setState({

        // })
    }


    render(){
        const { snackIngredients } = this.state
        const { saltyIngredients, sweetIngredients } = this.props
        return (
            <div className='new-snack-form'>
                <h2>Create a New Snack</h2>
                    {snackIngredients.length > 0 ? this.renderAddedIngredients() : null }
                <form onSubmit={() => {this.props.handleNewFormSubmit(this.state)}}>
                    <label>Snack Name:</label><br/>
                    <input type='text'name='snackName'onChange={(e) => this.handleInputChange(e)}/><br/>
                    <br/>
                    <label>Snack Description:</label><br/>
                    <textarea name='snackDescription' rows='4' cols='30'onChange={(e) => this.handleInputChange(e)}/><br/>
                    <br/>
                    <hr width='50%' />
                    <br />
                    <IngredientsContainer checked={(ingredient) => this.checkAddedIngredients(ingredient)} saltyIngredients={saltyIngredients} sweetIngredients={sweetIngredients} addSnackIngredient={ this.addSnackIngredient} removeSnackIngredient={ this.removeSnackIngredient}/>
                    <br />
                    <input type='submit'/>
                </form>
            </div>
        )
    }
}

export default NewSnackContainer