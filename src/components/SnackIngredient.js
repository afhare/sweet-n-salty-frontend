import React from 'react'

const SnackIngredient = props => {
    return(
        <li> {props.ingredient.amount} {props.ingredient.size ? props.ingredient.size : null} {props.ingredient.name ? props.ingredient.name : props.ingredient.ingredient.name} </li>
        )
}

export default SnackIngredient