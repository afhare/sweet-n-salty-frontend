const API_LINK = "http://localhost:3000/"
export default {

  fetchIngredients: () => {
    return fetch(`${API_LINK}ingredients`)
    .then(resp => resp.json())
  },
  fetchSnacks: () => {
    return fetch(`${API_LINK}snacks`)
    .then(resp => resp.json())
  },
  getSnack: (snackId) => {
    return fetch(`${API_LINK}snacks/${snackId}`)
    .then(resp => resp.json())
  },
  newSnack: (bodyObj) =>{
    let reqObj = {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      body: JSON.stringify(bodyObj)
    }

    return fetch(`${API_LINK}snacks`, reqObj).then(response => response.json())
  },

}
