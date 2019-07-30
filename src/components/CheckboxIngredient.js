import React from 'react'

class CheckboxIngredient extends React.Component {
    constructor(props){
        super(props);
        this.state={
            name: this.props.ingredient.name,
            type: this.props.type,
            amount: undefined,
            size: undefined,
            checked: this.props.checked,
            confirmed: this.props.checked
        }
    }

    componentDidMount(){
        console.log(this.props)
    }

    handleCheckbox = () => {
        this.setState({ checked: !this.state.checked })
        if (!!this.state.checked && this.state.confirmed) {
            window.alert(`The ${this.state.name} has/have been removed from your snack recipe!`)
            const amount = `${this.state.amount} ${this.state.size}`
            this.props.removeSnackIngredient({name: this.state.name, type: this.state.type, amount: amount})
            this.setState({confirmed: false})
        }
    }

    collectSnackIngredient = (e) => {
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
            this.props.addSnackIngredient({name: this.state.name, type: this.state.type, amount: amount})
        } else {
            window.alert('Please select an amount and/or size to continue.')
        }
    }
    render(){
        return (
            <label>
                {this.props.ingredient.name}
                <input name={this.props.ingredient.name} type='checkbox' checked={this.state.checked} onChange={this.handleCheckbox}/>
                {this.state.checked && !this.state.confirmed ?
                <div className='ingredient-amount-selection'>
                <label>Select an amount:  </label>
                    <br />
                    <select onChange={(e) => this.collectSnackIngredient(e)} name='amount'>
                        <option value='null'>Ingredient Amount:</option>
                        <option value='1/4'> 1/4 </option>
                        <option value='1/2'> 1/2 </option>
                        <option value='3/4'> 3/4 </option>
                        <option value='1'> 1 </option>
                    </select>
                    <br />
                <label>Select a size:  </label>
                    <br />
                    <select name='size' onChange={(e) => this.collectSnackIngredient(e)}>
                        <option value='null'>Amount Size:</option>
                        <option value='tablespoon'> tablespoon </option>
                        <option value='cup'> cup </option>
                    </select>
                    <br />
                    <button onClick={(e)=> this.confirmSnackIngredient(e)}>Confirm</button>
                </div>
                    : null }
                <br/>
            </label>
        )
    }
}

export default CheckboxIngredient
