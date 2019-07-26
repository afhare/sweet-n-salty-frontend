import React from 'react'

const SnackIngredient = props => {
        return (
            <li> {props.ingredient.amount} {props.ingredient.size} {props.ingredient.name} </li>
        )
}

export default SnackIngredient