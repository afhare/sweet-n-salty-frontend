import React from 'react'
import IngredientsContainer from './IngredientsContainer';
import SnackIngredient from '../components/SnackIngredient'
import Api from '../services/api';

class EditSnackContainer extends React.Component {
    constructor(props){
        super(props)
        if (props.snack) {
          this.state={
            snackId: props.snack.id,
            snack: props.snack,
            newIngredients: [],
            mixes: props.snack.mixes,
            mixIngredients: [],
            name: props.snack.name,
            description: props.snack.description,
            occasion: props.snack.occasion
          }
        } else {
          this.state={
            snackId: null,
            snack: null,
            newIngredients: [],
            mixes: null,
            mixIngredients: [],
            name: null,
            description: null,
            occasion: null
          }
          this.getSnack()
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
                <label>Snack Preview:</label>
                <ul className='snack-ingredient'>
                    {this.displayIngredientsInProgress()}
                </ul>
            </div>
        )
    }

    getSnack = () => {
      // debugger;
          Api.getSnack(this.props.match.params.id)
          .then(snack => {
            this.props.getSnack(snack)
        })
    }
    componentWillReceiveProps(nextProps) {
      if (nextProps.snack && !this.state.snack) {
        this.setState({
          snackId: nextProps.snack.id,
          snack: nextProps.snack,
          mixes: nextProps.snack.mixes,
          name: nextProps.snack.name,
          description: nextProps.snack.description,
          occasion: nextProps.snack.occasion
        })
      }
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

    handleEditFormSubmit = (e, state) => {
      this.props.handleEditFormSubmit(e,state)
      this.props.history.push("/snacks")
    }
    createSnackIngredient = (ingredientObj) => {
        this.setState({
            newIngredients: [...this.state.newIngredients, ingredientObj]
        })
    }
    renderAll = () => {
      const { mixes } = this.state
      const { saltyIngredients, sweetIngredients,handleEditFormSubmit } = this.props

      return(
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
    renderLoader = () => {
      return <h4> Loading </h4>
    }
    render(){

        return (
            <div>
            {this.props.snack ? this.renderAll() : this.renderLoader()}

            </div>
        )
    }
}

export default EditSnackContainer
