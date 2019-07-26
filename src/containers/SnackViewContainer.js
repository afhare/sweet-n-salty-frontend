import React from 'react'
import SnackIngredient from '../components/SnackIngredient'
import SweetOrSalty from '../components/SweetOrSalty';

class SnackViewContainer extends React.Component {
    constructor(props){
        super(props)
        this.state={}
    }

    renderSnackIngredients = () => {
        return this.props.mixes.map((ingredient) => {
            return <SnackIngredient ingredient={ingredient} key={ingredient.name}/>
        })
    }

    sweetOrSalty = () => {
        const types = this.props.mixes.map((ingredient) => {
            return ingredient.ingredient.type_of_ingredient
        })
        if (types.every((a) => a=== 'sweet')) {
            return <SweetOrSalty type='sweet' />
          } else if (types.every((a) => a=== 'salty')) {
            return <SweetOrSalty type='salty' />
          } else {
            return <SweetOrSalty type='mixed' />
          }
    }

    render(){
        return (
            <div className='view-snack-container'>
               <h3>{this.props.name}</h3>
               {this.sweetOrSalty()}
               <em>{this.props.description}</em>
               <hr width='50%' />
               <p>Perfect for: {this.props.occasion}</p>
               <ul className='ingredient-list'>
                {this.renderSnackIngredients()}
               </ul>
            </div>
        )
    }
}

export default SnackViewContainer