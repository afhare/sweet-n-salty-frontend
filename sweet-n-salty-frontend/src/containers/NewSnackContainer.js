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

    addSnackIngredient = (ingredient) => {
        this.setState({
            snackIngredients: [...this.state.snackIngredients, ingredient]
        })
    }

    renderAddedIngredients = () => {
        return(
            <div>
                <label>Currently Added Snack Ingredients:</label>
                {this.displayIngredientsInProgress()}
            </div>
        )
    }

    displayIngredientsInProgress = () => {
        return this.state.snackIngredients.map((ingredient) => {
            return <SnackIngredient ingredient={ingredient}/>
        })
    }

    handleInputChange = () => {
        //this.setState
    }

    render(){
        const { snackIngredients } = this.state
        const { saltyIngredients, sweetIngredients } = this.props
        return (
            <div className='new-snack-form'>
                    {snackIngredients.length > 0 ? this.renderAddedIngredients() : null }
                <form onSubmit={() => {this.props.handleNewFormSubmit(this.state)}}>
                    <label>Snack Name:</label><br/>
                    <input type='text'name='snackName'onChange={this.handleInputChange}/><br/>
                    <br/>
                    <label>Snack Description:</label><br/>
                    <textarea name='snackDescription' rows='4' cols='30'onChange={this.handleInputChange}/><br/>

                    <IngredientsContainer checked={(ingredient) => this.checkAddedIngredients(ingredient)} saltyIngredients={saltyIngredients} sweetIngredients={sweetIngredients} addSnackIngredient={(ingredient) => this.addSnackIngredient(ingredient)}/>
                    
                    <input type='submit'/>
                </form>
            </div>
        )
    }
}

export default NewSnackContainer