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
        'Authorization': `Bearer ${localStorage.getItem("user")}`,
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      body: JSON.stringify(bodyObj)
    }
    return fetch(`${API_LINK}snacks`, reqObj).then(response => response.json())
  },
  editSnack: (bodyObj, snackId) =>{
    let reqObj = {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("user")}`,
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      body: JSON.stringify(bodyObj)
    }
    return fetch(`${API_LINK}snacks/${snackId}`, reqObj).then(response => response.json())
  },
  deleteSnack: (snackId) =>{
    let reqObj = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user")}`
      }
    }
    return fetch(`${API_LINK}snacks/${snackId}`,reqObj).then(response => response.json())
  },
}
