import React from 'react'

const CheckboxIngredient = props => {
        return (
            <label>
                {props.ingredient.name}
                <input name={props.ingredient.name} type='checkbox' checked={()=> props.checked(props.ingredient)} onChange={() => props.addSnackIngredient(props.ingredient)}/>
                <br/>
            </label>
        )
}

export default CheckboxIngredient