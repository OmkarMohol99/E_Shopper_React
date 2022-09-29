import axios from "axios"

// const url1 = "http://127.0.0.1:8000/api/invoice1/"   // to get all data of customer order

// // const url2 = "http://127.0.0.1:8000/api/orders/"

// export const getAllData = () => {
//     return axios.get(url1)
// }

// export const getDataById = (userObject) => {
//     return axios.get(url1+userObject+userObject.id+"/")
// }

// const url3 = 'http://127.0.0.1:8000/api/invoice2/'

// export const getDataInBackend=(userData)=>{
//     return axios.post(url3+userData)
// }

const expense_url = "http://127.0.0.1:8000/expense_app/expense/"

export const getDataInBalancesheet = () =>{
    return axios.get(expense_url)
}

export const postDataInbackend=(userObj)=>{
    return axios.post(expense_url, userObj)
}