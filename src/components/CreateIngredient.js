import React from 'react'

class CreateIngredient extends React.Component {
    constructor(props){
        super(props);
        this.state={
            name: '',
            type: '',
            amount: undefined,
            size: undefined,
            addToMix: false,
            display: true
        }
    }

    handleInputChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    collectSnackIngredient = (e) => {
        this.setState({
            type: e.target.value
        })
    }

    handleNewIngredient = (e) => {
        e.preventDefault();
        this.setState({ addToMix: true, display: true})
        const name = this.state.name
        const type =this.state.type
        this.props.updateNewIngredient(this.props.index, {name: name, type: type})
    }

    undoNewIngredient = (e) => {
        e.preventDefault();
        this.props.removeNewIngredient(this.props.index)
    }

    updateSnackIngredient = (e) => {
        if (e.target.value === 'cup' || e.target.value === 'tablespoon'){
            this.setState({
                size: e.target.value
            })
        } else if (e.target.value === '1/4' || e.target.value === '1/2' || e.target.value === '3/4' || e.target.value === '1'){
            this.setState({
                amount: e.target.value
            })
        }
    }

    confirmSnackIngredient = (e) => {
        e.preventDefault()
        if (this.state.amount && this.state.size) {
            this.setState({
                confirmed: !this.state.confirmed
            })
            const amount = `${this.state.amount} ${this.state.size}`
            this.props.saveCreatedIngredients({name: this.state.name, type: this.state.type, amount: amount})
        } else {
            window.alert('Please select an amount and/or size to continue.')
        }
    }

    undoSnackIngredient = () => {
        this.setState({
            display: false
        })
    }

    addSizeAndAmountToIngredient = () => {
    return (
        <div className='ingredient-amount-selection'>
        <label>Select an amount:  </label>
            <br />
            <select onChange={(e) => this.updateSnackIngredient(e)} name='amount'>
                <option value='null'>Ingredient Amount:</option>
                <option value='1/4'> 1/4 </option>
                <option value='1/2'> 1/2 </option>
                <option value='3/4'> 3/4 </option>
                <option value='1'> 1 </option>
            </select>
            <br />
        <label>Select a size:  </label>
            <br />
            <select name='size' onChange={(e) => this.updateSnackIngredient(e)}>
                <option value='null'>Amount Size:</option>
                <option value='tablespoon'> tablespoon </option>
                <option value='cup'> cup </option>
            </select>
            <br />
            <button onClick={(e)=> this.undoSnackIngredient(e)}>Undo</button>
            <button onClick={(e)=> this.confirmSnackIngredient(e)}>Confirm</button>
        </div>
        )
    }

    discardNewIngredient = (e) => {
        e.preventDefault();
        let ingredientObj = {name: '', type: '', amount: ''}
        ingredientObj.name = this.state.name
        ingredientObj.type = this.state.type
        ingredientObj.amount = `${this.state.amount} ${this.state.size}`
        this.props.removeSnackIngredient(ingredientObj)
        this.setState({
            display: false,
            name: '',
            type: '',
            amount: undefined,
            size: undefined,
            addToMix: false
        })
    }

    render(){
        return (
            <div className='new-ingredient'>
                <br/>
                {this.state.addToMix && this.state.display ? 
                    <div>
                        <h3>Added Ingredient:</h3>
                        <label>Name: </label>
                        <p>{this.state.name}</p>
                        <label>Sweet or Salty? </label>
                        <p>{this.state.type}</p>
                        {this.state.confirmed ? <button onClick={(e) => this.discardNewIngredient(e)}>Discard New Ingredient</button> : this.addSizeAndAmountToIngredient()}
                    </div> :
                    <div>
                        <br />
                        <button onClick={(e)=> this.undoNewIngredient(e)}>Undo</button>
                        <label>Ingredient Name: </label>
                        <input name={this.state.name} value={this.state.name} placeholder='Ingredient Name' type='text' onChange={(e)=> this.handleInputChange(e)}/>
                        <br/>
                        <label>Ingredient Type: </label>
                        <select onChange={(e) => this.collectSnackIngredient(e)} name='type'>
                            <option value='null'>Sweet or Salty:</option>
                            <option value='sweet'> Sweet </option>
                            <option value='salty'> Salty </option>
                        </select>
                        <br/>
                        <button onClick={(e)=> this.handleNewIngredient(e)}>Continue to Add Ingredient to Snack Mix</button>
                    </div>
                }
                    <hr width='20%'/>
            </div>
        )
    }
}

export default CreateIngredient;