import React from 'react'
import SnackIngredient from '../components/SnackIngredient'
import SweetOrSalty from '../components/SweetOrSalty';
import Api from '../services/api';

class SnackViewContainer extends React.Component {
    constructor(props){
        super(props)
        this.state = {
          snack: this.props.snack,
          owner: this.props.snack ? this.props.snack.user.username : null
        }
        // if(!this.state.snack ){
        //   Api.getSnack(this.props.match.params.id)
        //   .then(snack => this.setState({snack}))
        // }
    }
// ,
// owner: this.props.snack.user.username
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
              <p>{this.props.snack ? this.state.owner: null}'s Pantry</p>
               <h3>{this.props.snack ? this.props.snack.name : null}</h3>
               <br />
               {this.props.snack ? this.sweetOrSalty(): null}
               <br />
               <br />
               <em>{this.props.snack ? this.props.snack.description : null}</em>
               <br />
               <hr width='50%' />
               <p>Perfect for: {this.props.snack ? this.props.snack.occasion: null}</p>
               <ul className='ingredient-list'>
                {this.props.snack ? this.renderSnackIngredients() : null}
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
//                <p>{this.state.owner}'s Pantry</p>
