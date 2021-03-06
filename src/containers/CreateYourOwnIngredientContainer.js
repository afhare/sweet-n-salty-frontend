import React from 'react'
import CreateIngredient from '../components/CreateIngredient'

class CreateYourOwnIngredientContainer extends React.Component {
    constructor(props){
        super(props);
        this.state={
            newIngredients: [],
            createdIngredients: []
        }
    }

    initiateNewIngredient = (e) => {
        e.preventDefault();
        let addIngredient = [...this.state.newIngredients]
        addIngredient.push({name: undefined, type: undefined})
        this.setState({
            newIngredients: addIngredient
        })
    }

    updateNewIngredient = (indexNum, ingredientObj) => {
        let updatedIngredients = [...this.state.newIngredients]
        updatedIngredients[indexNum] = ingredientObj
        this.setState({
            newIngredients: updatedIngredients
        })
    }

    removeNewIngredient = (indexNum) => {
        let currentIngredients = [...this.state.newIngredients]
        let filteredIngredientsA = currentIngredients.slice(0,indexNum)
        let filteredIngredientsB = currentIngredients.slice((indexNum+1))
        this.setState({
            newIngredients: [...filteredIngredientsA, ...filteredIngredientsB]
        })
    }



    createNewIngredient = () => {
    return this.state.newIngredients.map((timesToAdd) => {
        return <CreateIngredient key={this.state.newIngredients.indexOf(timesToAdd)} 
        index={this.state.newIngredients.indexOf(timesToAdd)}
        saveCreatedIngredients={(ingredientObj) => this.saveCreatedIngredients(ingredientObj)} 
        addSnackIngredient={this.props.addSnackIngredient}
        removeSnackIngredient={this.props.removeSnackIngredient}
        removeNewIngredient={(indexNum) => this.removeNewIngredient(indexNum)}
        updateNewIngredient={(indexNum, ingredientObj)=> this.updateNewIngredient(indexNum, ingredientObj)}/>}
    )
    }

    saveCreatedIngredients = (ingredientObj) => {
        let currentIngredients = [...this.state.createdIngredients]
        currentIngredients.push(ingredientObj)
        this.setState({
            createdIngredients: currentIngredients
        })
        this.props.addSnackIngredient(ingredientObj)
        let ingredientNameAndType = {name: '', type:''}
        ingredientNameAndType.name = ingredientObj.name
        ingredientNameAndType.type= ingredientObj.type
        this.props.createSnackIngredient(ingredientNameAndType)
    }

    render(){
        return (
            <div className='create-own-ingredient'>
                <p>Don't see your favorite snack mix ingredient?</p>
                <p>Contribute to our ingredients register and add your own!</p>
                <em>Note: This added ingredient will only be added to the register after submitting this snack.</em>
                <br/>
                <button className='add-ingredient' onClick={(e) => this.initiateNewIngredient(e)}>Add a New Ingredient</button>
                <br/>
                {this.state.newIngredients.length > 0 ? this.createNewIngredient() : null}
            </div>
        )
    }
}

export default CreateYourOwnIngredientContainer;
