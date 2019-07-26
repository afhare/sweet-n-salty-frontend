import React from 'react'
import CheckboxIngredient from '../components/CheckboxIngredient'

class IngredientsContainer extends React.Component {
    constructor(props){
        super(props)
        this.state={
            saltyShowButton: false,
            sweetShowButton: false,
        }
    }
    
    renderSaltyIngredients = () => {
        return this.props.saltyIngredients.map((ingredient) => {
            return (<CheckboxIngredient ingredient={ingredient} checked={()=> this.props.checked(ingredient)} addSnackIngredient={() => this.props.addSnackIngredient(ingredient)}/>)
        })
    }

    renderSweetIngredients = () => {
        return this.props.sweetIngredients.map((ingredient) => {
            return <CheckboxIngredient ingredient={ingredient} checked={()=> this.props.checked(ingredient)} addSnackIngredient={() => this.props.addSnackIngredient(ingredient)}/>
        })
    }

    displayMore = (e) => {
        e.preventDefault()
        this.setState({
            [e.target.name]: !this.state[e.target.name]
        })
    }

    render(){
        return (
            <div className='all-ingredients'>
                <div className='salty-ingredients'>
                    <h3>Salty  
                    <button className='display-salty-ingredients' onClick={(e)=> {this.displayMore(e)}} name='saltyShowButton'>+</button></h3>
                    <br/>
                    {this.state.saltyShowButton ? this.renderSaltyIngredients() : null}
                </div>
                <div className='sweet-ingredients'>
                    <h3>Sweet  
                    <button className='display-sweet-ingredients' onClick={(e)=> {this.displayMore(e)}} name='sweetShowButton'>+</button></h3>
                    <br/>
                    {this.state.sweetShowButton ? this.renderSweetIngredients() : null}
                </div>
            </div>
        )
    }
}

export default IngredientsContainer