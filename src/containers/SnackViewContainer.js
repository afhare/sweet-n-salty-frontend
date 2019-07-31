import React from 'react'
import SnackIngredient from '../components/SnackIngredient'
import SweetOrSalty from '../components/SweetOrSalty';
import Api from '../services/api';
import { Link } from 'react-router-dom';

class SnackViewContainer extends React.Component {
    constructor(props){
        super(props)
        this.state = {
          snack: this.getSnack(),
          owner: this.props.snack ? this.props.snack.user.username : null
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
        // console.log(e.target.className)
        if (e.target.className === 'edit') {
            this.props.history.push(`/snacks/${this.props.snack.id}/edit`)
            // this.props.snack
        } else if (e.target.className === 'delete') {
            this.props.deleteSnack(this.props.snack.id)
            this.props.history.push('/snacks')
        } else if (e.target.className === 'copy-save') {
            window.alert(`${this.props.name} has been added to your pantry.`)
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
    getSnack = () => {
          Api.getSnack(this.props.match.params.id)
          .then(snack => {
            this.props.getSnack(snack)
        })
        return ""
    }
    render(){
        return (
            <div className='view-snack-container'>
              <h2>{this.props.snack ? `${this.props.snack.user.username}'s Pantry` : null}'s Pantry</h2>
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
                <Link className='edit' to={{pathname:`/snacks/${this.props.snack ? this.props.snack.id: null}/edit`, snack: this.props.snack }}> Edit</Link>

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
