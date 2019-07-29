import React from 'react'
import SnackIngredient from '../components/SnackIngredient'
import SweetOrSalty from '../components/SweetOrSalty';

class SnackViewContainer extends React.Component {
    constructor(props){
        super(props)
        this.state={
            owner: this.props.snack.user.username
        }
    }

    snackCreator = () => {
        //compare the snack's user with the token--if they match
        //return true (to display edit and delete buttons)
        //else return false (to display the save button)
        //does this need to live in app?
        return true
    }

    buttonRedirect = (e) => {
        e.preventDefault();
        console.log(e.target.className)
        if (e.target.className === 'edit') {
            // this.props.history.push('/edit')
        } else if (e.target.className === 'delete') {
            this.props.history.push('/home')
            window.alert(`${this.props.name} has been deleted from your pantry.`)
        } else if (e.target.className === 'copy-save') {
            window.alert(`${this.props.name} has been added to your pantry.`)
            //update the state to reflect that this snack is yours
        }
    }

    renderSnackIngredients = () => {
        return this.props.snack.mixes.map((ingredient) => {
            return <SnackIngredient ingredient={ingredient} key={this.props.snack.mixes.indexOf(ingredient)}/>
        })
    }

    sweetOrSalty = () => {
        const types = this.props.snack.mixes.map((ingredient) => {
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
               <p>{this.state.owner}'s Pantry</p>
               <h3>{this.props.snack.name}</h3>
               <br />
               {this.sweetOrSalty()}
               <br />
               <br />
               <em>{this.props.snack.description}</em>
               <br />
               <hr width='50%' />
               <p>Perfect for: {this.props.snack.occasion}</p>
               <ul className='ingredient-list'>
                {this.renderSnackIngredients()}
               </ul>
               {this.snackCreator() ? 
               <div className='userSnackDashboard'>
                <button className='edit' onClick={(e) => this.buttonRedirect(e)}>Edit This Snack</button>
                <button className='delete' onClick={(e) => this.buttonRedirect(e)}>Delete This Snack</button>
               </div>
               : 
               <div className='guestSnackDashboard'>
                <button className='copy-save' onClick={(e) => this.buttonRedirect(e)}>Save This Snack</button>
               </div>
               }
            </div>
        )
    }
}

export default SnackViewContainer